import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfiles() {
    console.log('jm: attempting to get all profiles');

    return this.profileService.getAllProfiles();
  }
}
