import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('api/v1')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/auth/sign-in')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto)
	}

	@Post('/auth/sign-up')
	registration(@Body() userDto: CreateUserDto) {
		return this.authService.registration(userDto)
	}
}
