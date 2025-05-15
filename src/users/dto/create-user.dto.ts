import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
	@ApiProperty({ example: 'example@icloud.com', description: 'Email address' })
	readonly email: string

	@ApiProperty({ example: 'password123', description: 'Password' })
	readonly password: string
}
