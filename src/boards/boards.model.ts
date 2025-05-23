import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface BoardCreationAttrs {
	name: string
	description: string
	lastOpenedAt: string
	isFavorite: boolean
}

@Table({ tableName: 'boards' })
export class Board extends Model<Board, BoardCreationAttrs> {
	@ApiProperty({ example: 1, description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number

	@ApiProperty({ example: 'name', description: 'Board name' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string

	@ApiProperty({ example: 'description', description: 'Board description' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare description: string

	@ApiProperty({
		example: '2025-05-22T11:17:03.695Z',
		description: 'Last opened at',
	})
	@Column({ type: DataType.DATE, allowNull: false })
	declare lastOpenedAt: string

	@ApiProperty({ example: false, description: 'Board favorite state' })
	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
	declare isFavorite: boolean
}
