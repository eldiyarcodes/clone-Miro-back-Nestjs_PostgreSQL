import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { UserDto } from 'src/users/dto/user.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('api/v1')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@Post('/auth/sign-in')
	async login(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.login(userDto, res)
	}

	@ApiOperation({ summary: 'Register' })
	@UsePipes(ValidationPipe)
	@Post('/auth/sign-up')
	async registration(
		@Body() userDto: UserDto,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.registration(userDto, res)
	}

	@ApiOperation({ summary: 'Refresh token' })
	@Post('/auth/refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		return this.authService.refreshToken(req, res)
	}

	@ApiOperation({ summary: 'Logout' })
	@Post('/auth/logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		return this.authService.logout(res)
	}
}
