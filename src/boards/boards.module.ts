import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { BoardController } from './boards.controller'
import { Board } from './boards.model'
import { BoardService } from './boards.service'

@Module({
	controllers: [BoardController],
	providers: [BoardService],
	imports: [SequelizeModule.forFeature([Board])],
})
export class BoardModule {}
