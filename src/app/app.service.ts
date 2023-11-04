import { Injectable } from '@nestjs/common';

import { SwaggerConfig } from '../config/swagger/swagger.config';
import { getApp } from '../main';
import { RedocModule } from './modules/redoc/redoc.module';
import { LoggerFactory } from './modules/shared/services/logger-factory.service';

const logger = LoggerFactory.create('AppService');

@Injectable()
export class AppService {
	async configureDocumentation(): Promise<void> {
		try {
			logger.log('Setting up Redoc');

			const app = getApp();
			const path = SwaggerConfig.path();
			const document = await SwaggerConfig.fetchDocument();

			const redocOptions = SwaggerConfig.redocOptions(document);

			await RedocModule.setup(path, app, document.swagger, redocOptions);

			logger.log('API documentation successfully configured');
		} catch (error) {
			logger.error(`${error.status}, ${error.message}`);

			throw error;
		}
	}
}
