import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import * as Multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly s3: S3 = new S3({
    region: this.configService.get<string>('file.awsS3Region', {
      infer: true,
    }),
  });

  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  async uploadFile(file: Multer.Multer.File | multerS3.File): Promise<string> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      s3: (file as Multer.MulterS3.File).location,
    };

    return path.s3;
  }

  async deleteFile(path: string): Promise<void> {
    const bucketName = this.configService.get<string>(
      'file.awsDefaultS3Bucket',
      {
        infer: true,
      },
    );

    const params = {
      Bucket: bucketName,
      Key: 'uploads/' + path,
    };

    console.log('Delete image params', params);

    try {
      await this.s3.deleteObject(params);
    } catch (error) {
      // Handle errors
      console.error(`Error deleting file from S3: ${error.message}`);
      throw new Error(`Error deleting file from S3: ${error.message}`);
    }
  }
}
