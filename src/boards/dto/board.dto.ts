import { ApiProperty } from '@nestjs/swagger'
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsString,
} from 'class-validator'

export class CreateBoardDto {
	@ApiProperty({ example: 'name', description: 'Board name' })
	@IsString()
	@IsNotEmpty()
	readonly name: string

	@ApiProperty({ example: 'description', description: 'Board description' })
	@IsString()
	@IsNotEmpty()
	readonly description: string

	@ApiProperty({
		example: '2025-05-22T11:17:03.695Z',
		description: 'Last opened at',
	})
	@IsDateString()
	readonly lastOpenedAt: string

	@ApiProperty({ example: false, description: 'Board favorite state' })
	@IsBoolean()
	readonly isFavorite: boolean
}

export class UpdateBoardNameDto {
	@ApiProperty({ example: 1, description: 'ID доски' })
	@IsNumber()
	boardId: number

	@ApiProperty({ example: 'Новое название', description: 'Новое имя доски' })
	@IsString()
	@IsNotEmpty()
	boardName: string
}
