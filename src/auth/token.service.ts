import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class TokensService {
	constructor(private jwtService: JwtService) {}

	generateTokens(payload: any) {
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: '15m',
		})

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: '7d',
		})

		return { accessToken, refreshToken }
	}

	setRefreshTokenCookie(res: Response, token: string) {
		res.cookie('refresh_token', token, {
			httpOnly: true,
			path: '/',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
			sameSite: 'strict',
			secure: true, // использовать только на HTTPS
		})
	}

	validateRefreshToken(token: string): any {
		try {
			return this.jwtService.verify(token)
		} catch (e) {
			throw new UnauthorizedException('Invalid refresh token')
		}
	}
}
