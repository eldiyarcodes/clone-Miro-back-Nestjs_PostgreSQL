import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Board } from './boards.model'
import { BoardService } from './boards.service'
import { CreateBoardDto, UpdateBoardNameDto } from './dto/board.dto'

@ApiTags('Boards')
@Controller('api/v1')
export class BoardController {
	constructor(private boardService: BoardService) {}

	@ApiOperation({ summary: 'Create board' })
	@ApiResponse({ status: 200, type: Board })
	@UseGuards(JwtAuthGuard)
	@Post('/boards/create')
	create(@Body() boardDto: CreateBoardDto) {
		return this.boardService.createBoard(boardDto)
	}

	@ApiOperation({ summary: 'Update board name' })
	@ApiResponse({ status: 200, type: Board })
	@UseGuards(JwtAuthGuard)
	@Patch('/boards/update-name')
	updateBoardName(@Body() dto: UpdateBoardNameDto) {
		return this.boardService.updateBoardName(dto.boardId, dto.boardName)
	}

	@ApiOperation({ summary: 'Update board status' })
	@Patch('/boards/:id/favorite')
	updateBoardFavorite(@Param('id') id: string) {
		return this.boardService.updateBoardFavorite(Number(id))
	}

	@ApiOperation({ summary: 'Get all boards for current user' })
	@ApiResponse({ status: 200, type: [Board] })
	@UseGuards(JwtAuthGuard)
	@Get('/boards')
	getAll() {
		return this.boardService.getAllBoards()
	}

	@ApiOperation({ summary: 'Delete board by ID' })
	@ApiResponse({ status: 200, description: 'Board successfully deleted' })
	@UseGuards(JwtAuthGuard)
	@Delete('/boards/:id')
	delete(@Param('id') id: string) {
		return this.boardService.deleteBoard(Number(id))
	}
}
