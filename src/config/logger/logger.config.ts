/* eslint-disable unused-imports/no-unused-vars */
import { IncomingMessage } from 'http';
import { Params } from 'nestjs-pino';
import * as pino from 'pino';

import { config } from '../app/index';

const { logger } = config;

export const loggerConfig: Params = {
	pinoHttp: {
		level: logger.level ? logger.level : 'info',
		transport: transportConfig(),
		messageKey: 'message',
		autoLogging: false,
		serializers: {
			req: (): undefined => {
				return undefined;
			},
			res: (): undefined => {
				return undefined;
			},
		},
		customProps: (req: IncomingMessage): object => {
			return {
				endpoint: `${req.method} ${req.url}`,
			};
		},
	},
};

function transportConfig(): pino.TransportSingleOptions {
	return {
		target: 'pino-pretty',
		options: {
			messageKey: 'message',
			ignore: 'pid,hostname,time',
			colorize: true,
		},
	};
}
