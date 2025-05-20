import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { UserDto } from 'src/users/dto/user.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('api/v1')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/auth/sign-in')
	async login(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.login(userDto, res)
	}

	@UsePipes(ValidationPipe)
	@Post('/auth/sign-up')
	async registration(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.registration(userDto, res)
	}

	@Post('/auth/refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refreshToken(req, res)
	}

	@Post('/auth/logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}
