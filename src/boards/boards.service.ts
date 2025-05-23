import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Board } from './boards.model'
import { CreateBoardDto, GetBoardsQueryDto } from './dto/board.dto'

@Injectable()
export class BoardService {
	constructor(@InjectModel(Board) private boardRepozitory: typeof Board) {}

	async createBoard(dto: CreateBoardDto) {
		const board = await this.boardRepozitory.create(dto)

		return {
			status: 'success',
			message: 'Доска созадна',
			board,
		}
	}

	async updateBoardName(boardId: number, boardName: string) {
		const board = await this.boardRepozitory.findByPk(boardId)

		if (!board) {
			throw new HttpException(
				`Доска с id ${boardId} не найдена`,
				HttpStatus.NOT_FOUND
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
				HttpStatus.NOT_FOUND
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

	async getAllBoards(query: GetBoardsQueryDto) {
		const {
			isFavorite,
			sort = 'lastOpenedAt',
			limit = 10,
			page = 1,
			search,
		} = query

		const where: any = {}

		if (isFavorite !== undefined) {
			where.isFavorite = isFavorite === 'true'
		}

		if (search) {
			where.name = { [Op.iLike]: `%${search}%` }
		}

		const offset = (page - 1) * limit

		const { rows: data, count: total } =
			await this.boardRepozitory.findAndCountAll({
				where,
				order: [[sort, 'DESC']],
				limit,
				offset,
			})

		return {
			total,
			totalPages: Math.ceil(total / limit),
			data,
		}
	}

	async getBaordById(id: number) {
		const board = await this.boardRepozitory.findByPk(id)

		if (!board) {
			throw new HttpException(
				`Доска с id ${id} не найдена`,
				HttpStatus.NOT_FOUND
			)
		}

		return {
			status: 'success',
			board,
		}
	}

	async deleteBoard(id: number) {
		const board = await this.boardRepozitory.findByPk(id)

		if (!board) {
			throw new HttpException(
				`Доска с id ${id} не найдена`,
				HttpStatus.NOT_FOUND
			)
		}

		await board.destroy()

		return {
			status: 'success',
			message: `Доска с id ${id} удалена`,
		}
	}
}
