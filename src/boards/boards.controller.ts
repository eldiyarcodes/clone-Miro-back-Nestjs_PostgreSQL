import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Board } from './boards.model'
import { BoardService } from './boards.service'
import {
	CreateBoardDto,
	GetBoardsQueryDto,
	UpdateBoardFavoriteDto,
	UpdateBoardNameDto,
} from './dto/board.dto'

@ApiTags('Boards')
@Controller('api/v1')
export class BoardController {
	constructor(private boardService: BoardService) {}

	@Post('/boards/create')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Create board' })
	@ApiResponse({ status: 200, type: Board })
	create(@Body() boardDto: CreateBoardDto) {
		return this.boardService.createBoard(boardDto)
	}

	@Patch('/boards/update-name')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update board name' })
	@ApiResponse({ status: 200, type: Board })
	updateBoardName(@Body() dto: UpdateBoardNameDto) {
		return this.boardService.updateBoardName(dto.boardId, dto.boardName)
	}

	@Patch('/boards/favorite')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Update board status' })
	updateBoardFavorite(@Body() dto: UpdateBoardFavoriteDto) {
		return this.boardService.updateBoardFavorite(dto.boardId, dto.isFavorite)
	}

	@Get('/boards')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get all boards with filters' })
	@ApiResponse({ status: 200, type: [Board] })
	getAll(@Query() query: GetBoardsQueryDto) {
		return this.boardService.getAllBoards(query)
	}

	@Get('/boards/:id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get board by ID' })
	@ApiResponse({ status: 200, type: Board })
	getById(@Param('id') id: string) {
		return this.boardService.getBaordById(Number(id))
	}

	@Delete('/boards/:id')
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Delete board by ID' })
	@ApiResponse({ status: 200, description: 'Board successfully deleted' })
	delete(@Param('id') id: string) {
		return this.boardService.deleteBoard(Number(id))
	}
}
