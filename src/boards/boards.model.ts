import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface BoardCreationAttrs {
	name: string
	description: string
}

@Table({ tableName: 'boards' })
export class Board extends Model<Board, BoardCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique identifier' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number

	@ApiProperty({ example: 'name', description: 'Board name' })
	@Column({ type: DataType.STRING, allowNull: false })
	name: string

	@ApiProperty({ example: 'description', description: 'Board description' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string
}
