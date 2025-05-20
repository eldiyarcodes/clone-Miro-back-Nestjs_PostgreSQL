import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Board } from './boards.model'
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardService {
	constructor(@InjectModel(Board) private boardRepozitory: typeof Board) {}

	async createBoard(dto: CreateBoardDto) {
		const board = await this.boardRepozitory.create(dto)
		return {
			status: 'success',
			board,
		}
	}

	async getAllBoards() {
		const boards = await this.boardRepozitory.findAll()
		return {
			status: 'success',
			data: boards,
		}
	}

	async deleteBoard(id: number) {
		const board = await this.boardRepozitory.findByPk(id)
		if (!board) {
			return {
				status: 'error',
				message: 'Доска не найдена',
			}
		}

		await board.destroy()

		return {
			status: 'success',
			message: `Доска с id ${id} удалена`,
		}
	}
}
