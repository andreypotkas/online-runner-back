import { registerAs } from '@nestjs/config';
import { FileConfig } from 'src/files/config/file-config.type';
import { IsOptional, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  ACCESS_KEY_ID: string;

  @IsString()
  SECRET_ACCESS_KEY: string;

  @IsString()
  AWS_DEFAULT_S3_BUCKET: string;

  @IsString()
  @IsOptional()
  AWS_DEFAULT_S3_URL: string;

  @IsString()
  AWS_S3_REGION: string;
}

export default registerAs<FileConfig>('file', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    driver: 's3',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    awsDefaultS3Bucket: process.env.AWS_DEFAULT_S3_BUCKET,
    awsDefaultS3Url: process.env.AWS_DEFAULT_S3_URL,
    awsS3Region: process.env.AWS_S3_REGION,
    maxFileSize: 5242880,
  };
});
