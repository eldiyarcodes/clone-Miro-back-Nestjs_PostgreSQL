import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepozitory: typeof User) {}

	async createUser(dto: CreateUserDto) {
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
}
