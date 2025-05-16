import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		const token = await this.generateToken(user)

		return {
			stattus: 'success',
			token,
		}
	}

	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email)

		if (candidate) {
			throw new HttpException(
				'A user with such email exists',
				HttpStatus.BAD_REQUEST
			)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 10)
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword,
		})

		const tokens = await this.generateToken(user)

		return {
			status: 'success',
			user_id: user.user.id,
			tokens,
		}
	}

	private async generateToken(user) {
		const payload = { email: user.email, id: user.id }
		return this.jwtService.sign(payload)
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)

		if (!user) {
			throw new UnauthorizedException({
				message: 'Incorrect email or password',
			})
		}

		const passwordEquals = await bcrypt.compare(userDto.password, user.password)

		if (user && passwordEquals) {
			return user
		}

		throw new UnauthorizedException({ message: 'Incorrect email or password' })
	}
}
