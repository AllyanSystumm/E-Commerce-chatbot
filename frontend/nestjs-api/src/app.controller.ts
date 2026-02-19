import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('chat')
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post()
    async chat(@Body() body: any) {
        return this.appService.getChatResponse(body);
    }
}
