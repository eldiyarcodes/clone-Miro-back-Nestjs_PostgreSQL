import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Board } from './boards.model'
import { BoardService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'

@ApiTags('Boards')
@Controller('api/v1')
export class BoardController {
	constructor(private boardService: BoardService) {}

	@ApiOperation({ summary: 'Create board' })
	@ApiResponse({ status: 200, type: Board })
	@Post('/boards/create')
	create(@Body() userDto: CreateBoardDto) {
		return this.boardService.createBoard(userDto)
	}

	@ApiOperation({ summary: 'Get all boards for current user' })
	@ApiResponse({ status: 200, type: [Board] })
	@Get('/boards')
	getAll() {
		return this.boardService.getAllBoards()
	}

	@ApiOperation({ summary: 'Delete board by ID' })
	@ApiResponse({ status: 200, description: 'Board successfully deleted' })
	@Delete('/boards/:id')
	delete(@Param('id') id: string) {
		return this.boardService.deleteBoard(Number(id))
	}
}
