import { OpenAPIObject } from '@nestjs/swagger';

import { RedocOptions } from '../../app/modules/redoc/interfaces/redoc-options.interface';

export interface FetchedDocument {
	redocOptions: RedocOptions;
	swagger: OpenAPIObject;
}
