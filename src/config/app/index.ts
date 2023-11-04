import { apiConfig } from './api/api.config';
import { ConfigFactory } from './config-factory.service';
import { environmentVariablesConfig } from './environment/environment-variables.config';
import { projectConfig } from './project/project.config';

type AppConfig = typeof environmentVariablesConfig & typeof apiConfig & typeof projectConfig;

export const configClass = new ConfigFactory<AppConfig>({
	...environmentVariablesConfig,
	...apiConfig,
	...projectConfig,
});

export const config = configClass.get();
