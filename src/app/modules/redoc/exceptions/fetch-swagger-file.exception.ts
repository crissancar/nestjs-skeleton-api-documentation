import { HttpException, HttpStatus } from '@nestjs/common';

export class FetchSwaggerFileException extends HttpException {
	constructor() {
		super('Fetch swagger file from API failed', HttpStatus.BAD_REQUEST);
	}
}
