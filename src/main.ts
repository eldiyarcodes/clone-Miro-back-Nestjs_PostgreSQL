import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function start() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create(AppModule)

	app.enableCors({
		origin: 'http://localhost:5173',
		credentials: true,
	})

	app.use(cookieParser())

	const config = new DocumentBuilder()
		.setTitle('API Documentation Clone Miro')
		.setDescription('REST API Documentation')
		.setVersion('1.0.0')
		.addTag('@eldiyarchess')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/swagger-ui', app, document)

	await app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
}

start()
