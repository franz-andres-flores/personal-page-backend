import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {

  validate(file: Express.Multer.File) {
    let resourceType: 'image' | 'video';
    if (['image/png', 'image/jpeg'].includes(file.mimetype)) {
      resourceType = 'image';
    } else if (file.mimetype === 'video/mp4') {
      resourceType = 'video';
    } else {
      throw new BadRequestException('Only PNG, JPG, and MP4 files are allowed');
    }

    // Validate file size
    const maxFileSize = resourceType === 'image' ? 2 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      throw new BadRequestException(
        `File size must not exceed ${resourceType === 'image' ? '2MB' : '10MB'}.`,
      );
    }
  }

  async uploadFile(file: Express.Multer.File, resource_type: 'image' | 'video'): Promise<UploadApiResponse | UploadApiErrorResponse> {
    this.validate(file);
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: resource_type }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

}
