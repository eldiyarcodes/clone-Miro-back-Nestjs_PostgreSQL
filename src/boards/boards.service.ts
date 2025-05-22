import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Board } from './boards.model'
import { CreateBoardDto } from './dto/board.dto'

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

	async updateBoardName(boardId: number, boardName: string) {
		const board = await this.boardRepozitory.findByPk(boardId)

		if (!board) {
			throw new HttpException(
				`Доска с id ${boardId} не найдена`,
				HttpStatus.BAD_REQUEST
			)
		}

		board.name = boardName
		await board.save()

		return {
			status: 'success',
			message: 'Названия доски обновлено',
			board,
		}
	}

	async updateBoardFavorite(boardId: number) {
		const board = await this.boardRepozitory.findByPk(boardId)

		if (!board) {
			throw new HttpException(
				`Доска с id ${boardId} не найдена`,
				HttpStatus.BAD_REQUEST
			)
		}

		board.isFavorite = !board.isFavorite
		board.save()

		return {
			status: 'success',
			message: `Поле isFavorite обновлено на ${board.isFavorite}`,
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
