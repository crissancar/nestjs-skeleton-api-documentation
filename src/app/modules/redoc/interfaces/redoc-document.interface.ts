import { OpenAPIObject } from '@nestjs/swagger';

import { LogoOptions, TagGroupOptions } from './redoc-options.interface';

export interface RedocDocument extends Partial<OpenAPIObject> {
	info: OpenAPIObject['info'] & {
		'x-logo'?: LogoOptions;
	};
	'x-tagGroups': TagGroupOptions[];
}
