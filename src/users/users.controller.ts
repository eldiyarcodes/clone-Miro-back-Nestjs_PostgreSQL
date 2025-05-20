import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/v1')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Get('/users')
	getAll() {
		return this.userService.getAllUsers()
	}
}
