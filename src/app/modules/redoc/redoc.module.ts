/* eslint-disable no-console */
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OpenAPIObject } from '@nestjs/swagger';
import { Request, Response } from 'express';
import expressAuth from 'express-basic-auth';
import * as handlebars from 'express-handlebars';
import pathModule from 'path';
import * as process from 'process';
import { resolve } from 'url';

import { LoggerFactory } from '../shared/services/logger-factory.service';
import { RedocDocument } from './interfaces/redoc-document.interface';
import { RedocOptions } from './interfaces/redoc-options.interface';
import { documentSchema } from './schemas/document.schema';

const logger = LoggerFactory.create('RedocModule');

export class RedocModule {
	public static async setup(
		path: string,
		app: INestApplication,
		document: OpenAPIObject,
		options: RedocOptions,
		debug?: boolean,
	): Promise<void> {
		try {
			if (debug) {
				logger.verbose('Debug mode is enabled');
			}

			const _options = await this.validateOptionsObject(options, document, debug);

			const redocDocument = this.addVendorExtensions(_options, <RedocDocument>document);

			await this.setupExpress(path, <NestExpressApplication>app, redocDocument, _options);

			return;
		} catch (error) {
			if (debug) {
				console.table(options);
				console.dir(document);
				logger.error(error);
			}
			logger.error(error.message);
			throw error;
		}
	}

	private static async validateOptionsObject(
		options: RedocOptions,
		document: OpenAPIObject,
		debug?: boolean,
	): Promise<RedocOptions> {
		try {
			return (await documentSchema(document).validateAsync(options)) as RedocOptions;
		} catch (error) {
			// Something went wrong while parsing config object
			if (debug) {
				console.table(options);
				console.dir(document);
				console.error(error);
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			throw new TypeError(error.message);
		}
	}

	private static async setupExpress(
		path: string,
		app: NestExpressApplication,
		document: RedocDocument,
		options: RedocOptions,
	): Promise<void> {
		const httpAdapter = app.getHttpAdapter();
		// Normalize URL path to use
		const finalPath = this.normalizePath(path);
		// Add a slash to the end of the URL path to use in URL resolve function
		const resolvedPath = finalPath.slice(-1) !== '/' ? `${finalPath}/` : finalPath;
		// Serve swagger spec in another URL appended to the normalized path
		const docUrl = resolve(resolvedPath, `${options.docName}.json`);
		// create helper to convert metadata to JSON
		const hbs = handlebars.create({
			helpers: {
				toJSON(object: never) {
					return JSON.stringify(object);
				},
			},
		});
		// spread redoc options
		const { title, favicon, theme, redocVersion, ...otherOptions } = options;
		// create render object
		const renderData = {
			data: {
				title,
				docUrl,
				favicon,
				redocVersion,
				options: otherOptions,
				...(theme && {
					theme: {
						...theme,
					},
				}),
			},
		};
		// this is our handlebars file path
		const redocFilePath = pathModule.join(process.cwd(), 'artifacts/redoc', 'redoc.handlebars');
		// get handlebars rendered HTML
		const redocHTML = await hbs.render(redocFilePath, renderData);
		// Serve ReDoc Frontend
		httpAdapter.get(finalPath, (req: Request, res: Response) => {
			const sendPage = (): void => {
				// Content-Security-Policy: worker-src 'self' blob:
				res.setHeader(
					'Content-Security-Policy',
					"default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; child-src * 'unsafe-inline' 'unsafe-eval' blob:; worker-src * 'unsafe-inline' 'unsafe-eval' blob:; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
				);
				// whoosh
				res.send(redocHTML);
			};
			if (options.auth?.enabled) {
				const { user, password } = options.auth;
				expressAuth({ users: { [user]: password }, challenge: true })(req, res, () => {
					sendPage();
				});
			} else {
				sendPage();
			}
		});
		// Serve swagger spec json
		httpAdapter.get(docUrl, (req: Request, res: Response) => {
			res.setHeader('Content-Type', 'application/json');
			res.send(document);
		});
	}

	private static normalizePath(path: string): string {
		return path.charAt(0) !== '/' ? `/${path}` : path;
	}

	private static addVendorExtensions(
		options: RedocOptions,
		document: RedocDocument,
	): RedocDocument {
		if (options.logo) {
			document.info['x-logo'] = { ...options.logo };
		}

		if (options.tagGroups) {
			document['x-tagGroups'] = options.tagGroups;
		}

		return document;
	}
}
