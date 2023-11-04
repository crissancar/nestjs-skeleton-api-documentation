import * as colorette from 'colorette';
import { pid } from 'process';
import * as process from 'process';

import { LoggerFactory } from '../../app/modules/shared/services/logger-factory.service';
import { config } from '../app';
import { SwaggerConfig } from '../swagger/swagger.config';

const { api, project, env } = config;

const logger = LoggerFactory.create('');

export class WelcomeLogs {
	static apiUrl = api.url || `http://localhost:${api.port}`;
	static apiVersion = api.version;
	static projectName = project.appName;
	static pid = pid;
	static environment = config.environment;
	static PWD = config.PWD;
	static documentationPath = SwaggerConfig.path();
	static showEnv = env.show;

	static run(): void {
		logger.log(`${this.projectName}'s magic happens at ${this.apiUrl}/${this.documentationPath}`);
		logger.log(`Environment: ${this.environment}`);
		logger.log(`PID: ${this.pid || 'not forked'}`);
		logger.log(`Root: ${this.PWD}`);
		if (this.showEnv) {
			const skeletonAPIDocumentationEnv = Object.fromEntries(
				Object.entries(process.env).filter(([key]) => /^SKELETON_API_DOCUMENTATION/.test(key)),
			);
			logger.debug({
				message: colorette.yellowBright('Skeleton API documentation environment variables'),
				...skeletonAPIDocumentationEnv,
			});
		}
	}
}
