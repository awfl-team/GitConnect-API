import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const corsOption: CorsOptions = { origin: '*' }
    const options = new DocumentBuilder()
        .setTitle('GitConnect API')
        .setDescription('available method in GitConnect API')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('swagger', app, document)
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors(corsOption)
    await app.listen(3000)
}
bootstrap()
