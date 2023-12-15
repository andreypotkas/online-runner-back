import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
import * as Multer from 'multer';
import multerS3 from 'multer-s3';
import { S3 } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
  private readonly s3: S3 = new S3();

  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(
    file: Multer.Multer.File | multerS3.File,
  ): Promise<FileEntity> {
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

    return this.fileRepository.save(
      this.fileRepository.create({
        path: path[
          this.configService.getOrThrow('file.driver', { infer: true })
        ],
      }),
    );
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
      Key: path,
    };

    try {
      // Delete file from S3 using the existing S3Client
      await this.s3.deleteObject(params);
    } catch (error) {
      // Handle errors
      console.error(`Error deleting file from S3: ${error.message}`);
      throw new Error(`Error deleting file from S3: ${error.message}`);
    }
  }
}
