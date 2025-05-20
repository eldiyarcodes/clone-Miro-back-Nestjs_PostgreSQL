import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { BoardController } from './boards.controller'
import { Board } from './boards.model'
import { BoardService } from './boards.service'

@Module({
	controllers: [BoardController],
	providers: [BoardService],
	imports: [SequelizeModule.forFeature([Board]), forwardRef(() => AuthModule)],
})
export class BoardModule {}
