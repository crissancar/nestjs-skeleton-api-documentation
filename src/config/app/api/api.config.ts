import { documentationConfig } from './documentation.config';

export const apiConfig = {
	api: {
		url: null as string,
		port: process.env.PORT || 9979,
		apiKey: null as string,
		version: 'v1',
		documentation: documentationConfig,
	},
};
