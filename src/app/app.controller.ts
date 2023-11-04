import { Controller, OnModuleInit } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
	constructor(private readonly appService: AppService) {}

	async onModuleInit(): Promise<void> {
		await this.appService.configureDocumentation();
	}
}
