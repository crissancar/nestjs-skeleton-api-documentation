import { HttpException } from '@nestjs/common';

import { RedocOptions } from '../../app/modules/redoc/interfaces/redoc-options.interface';
import { LoggerFactory } from '../../app/modules/shared/services/logger-factory.service';
import { config } from '../app';
import { FetchedDocument } from './fetched-document.interface';

const { documentation } = config.api;
const { auth, title, logo, favicon } = documentation;
const { url, apiKey } = documentation.fetch;

const logger = LoggerFactory.create('SwaggerConfig');

export class SwaggerConfig {
	static async fetchDocument(): Promise<FetchedDocument> {
		logger.log(`Fetching API to get the swagger file`);

		const response = await fetch(url, {
			headers: { Authorization: `ApiKey ${apiKey}` },
		});

		if (!response.ok) {
			throw new HttpException(response.statusText, response.status);
		}

		const { data: swaggerDocument } = await response.json();

		return swaggerDocument;
	}

	static redocOptions(document: FetchedDocument): RedocOptions {
		return {
			...document.redocOptions,
			title,
			logo,
			favicon,
			auth,
		};
	}

	static path(): string {
		return '';
	}
}
