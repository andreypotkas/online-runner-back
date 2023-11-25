import { Module } from '@nestjs/common';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthPassportModule } from './auth-passport/auth-passport.module';

@Module({
  imports: [AuthPassportModule, AuthGoogleModule],
})
export class AuthModule {}
