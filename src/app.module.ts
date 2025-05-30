import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { Board } from './boards/boards.model'
import { BoardModule } from './boards/boards.module'
import { User } from './users/users.model'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Board],
			autoLoadModels: true,
		}),
		UsersModule,
		BoardModule,
		AuthModule,
	],
})
export class AppModule {}
