import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Registration user' })
	@ApiResponse({ status: 200, type: User })
	@Post('/users/register')
	create(@Body() userDto: CreateUserDto) {
		return this.userService.createUser(userDto)
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Get('/users')
	getAll() {
		return this.userService.getAllUsers()
	}
}
