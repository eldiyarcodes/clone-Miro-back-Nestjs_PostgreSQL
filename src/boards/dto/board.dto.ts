import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
	IsBoolean,
	IsBooleanString,
	IsDateString,
	IsIn,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
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

export class UpdateBoardFavoriteDto {
	@ApiProperty({ example: 1, description: 'ID доски' })
	@IsNumber()
	boardId: number

	@ApiProperty({ example: true, description: 'Нужное значение isFavorite' })
	@IsBoolean()
	isFavorite: boolean
}

export class GetBoardsQueryDto {
	@IsOptional()
	@IsBooleanString()
	@ApiPropertyOptional({ example: 'true', description: 'Filter by favorite' })
	isFavorite?: string

	@IsOptional()
	@IsIn(['createdAt', 'updatedAt', 'name', 'lastOpenedAt'])
	@ApiPropertyOptional({
		description: 'Sort by field',
		enum: ['createdAt', 'updatedAt', 'name', 'lastOpenedAt'],
		example: 'lastOpenedAt',
	})
	sort?: 'createdAt' | 'updatedAt' | 'name' | 'lastOpenedAt'

	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@IsPositive()
	@ApiPropertyOptional({ example: 10, description: 'Items per page' })
	limit?: number

	@IsOptional()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	@IsPositive()
	@ApiPropertyOptional({ example: 1, description: 'Page number' })
	page?: number

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ example: 'project', description: 'Search by name' })
	search?: string
}
