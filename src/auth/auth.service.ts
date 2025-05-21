import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { UserDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'
import { TokensService } from './token.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private tokensService: TokensService
	) {}

	async login(userDto: UserDto, res: Response) {
		const user = await this.validateUser(userDto)
		const tokens = this.tokensService.generateTokens({
			email: user.email,
			id: user.id,
		})

		this.tokensService.setRefreshTokenCookie(res, tokens.refreshToken)

		return {
			status: 'success',
			user: { id: user.id, email: user.email },
			access_token: tokens.accessToken,
		}
	}

	async registration(userDto: UserDto, res: Response) {
		const candidate = await this.userService.getUserByEmail(userDto.email)
		if (candidate) {
			throw new HttpException('Email уже занят', HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 10)
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword,
		})

		const tokens = this.tokensService.generateTokens({
			email: user.user.email,
			id: user.user.id,
		})

		this.tokensService.setRefreshTokenCookie(res, tokens.refreshToken)

		return {
			status: 'success',
			user: { id: user.user.id, email: userDto.email },
			access_token: tokens.accessToken,
		}
	}

	async logout(res: Response) {
		res.clearCookie('refresh_token', {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})

		return {
			status: 'success',
			message: 'Logout successful',
		}
	}

	async refreshToken(req: Request, res: Response) {
		const refreshToken = req.cookies?.refresh_token
		if (!refreshToken) {
			throw new HttpException('Нет токена', HttpStatus.UNAUTHORIZED)
		}

		const payload = this.tokensService.validateRefreshToken(refreshToken)
		const user = await this.userService.getUserByEmail(payload.email)

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.UNAUTHORIZED)
		}

		const tokens = this.tokensService.generateTokens({
			email: user.email,
			id: user.id,
		})

		this.tokensService.setRefreshTokenCookie(res, tokens.refreshToken)

		return {
			status: 'success',
			access_token: tokens.accessToken,
		}		
	}

	private async validateUser(userDto: UserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)

		if (!user) {
			throw new HttpException(
				'Неверный email или пароль',
				HttpStatus.BAD_REQUEST
			)
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password)

		if (user && passwordEquals) {
			return user
		}

		throw new HttpException('Неверный email или пароль', HttpStatus.BAD_REQUEST)
	}
}
