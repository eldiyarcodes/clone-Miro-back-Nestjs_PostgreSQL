import { ApiProperty } from '@nestjs/swagger'

export class CreateBoardDto {
	@ApiProperty({ example: 'name', description: 'Board name' })
	readonly name: string

	@ApiProperty({ example: 'description', description: 'Board description' })
	readonly description: string
}
