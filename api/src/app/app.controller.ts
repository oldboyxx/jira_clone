import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {


  @Get()
  public getRoot() {
    return 'Hello from nest';
  }
}
