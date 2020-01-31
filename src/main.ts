import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const options = new DocumentBuilder()
        .setTitle('GitConnect API')
        .setDescription('available method in GitConnect API')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(3000)
}
bootstrap()
