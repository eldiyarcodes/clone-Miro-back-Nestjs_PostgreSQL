import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class UserDto {
	@ApiProperty({ example: 'example@icloud.com', description: 'Email address' })
	@IsString({ message: 'Должно быть строкой' })
	@IsEmail({}, { message: 'Некорректный email' })
	readonly email: string

	@ApiProperty({ example: 'password123', description: 'Password' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
	readonly password: string
}
