import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [LoggerModule.forRoot(loggerConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
