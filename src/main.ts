import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { config } from './config/app/index';
import { WelcomeLogs } from './config/logger/welcome-logs.config';

const { api } = config;
let _app: INestApplication;
function setApp(app: INestApplication): void {
	_app = app;
}

export function getApp(): INestApplication {
	return _app;
}

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Set app instance to get in OnModuleInit
	setApp(app);

	// Launch the app
	await app.listen(api.port);

	// Welcome logs
	WelcomeLogs.run();
}

void bootstrap();
