import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthModuleService } from './auth-module.service';

@Controller()
export class AuthModuleController {
  constructor(private readonly authModuleService: AuthModuleService) {}

  @Get('currentUser')
  getCurrentUser() {
    return this.authModuleService.getCurrentUser();
  }
}
