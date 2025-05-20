import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserDto } from './dto/user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepozitory: typeof User) {}

	async createUser(dto: UserDto) {
		const user = await this.userRepozitory.create(dto)
		return {
			status: 'success',
			user,
		}
	}

	async getAllUsers() {
		const users = await this.userRepozitory.findAll()
		return {
			status: 'success',
			data: users,
		}
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepozitory.findOne({
			where: { email },
			attributes: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
		})
		const plainUser = user?.get({ plain: true })
		return plainUser
	}
}
