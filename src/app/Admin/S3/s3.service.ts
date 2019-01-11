import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';

const s3Bucket = new S3(
  {
    accessKeyId: 'AKIAJ2EQ46N2P32MRYAQ',
    secretAccessKey: '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',
    region: 'eu-west-1'
  }
);

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  private env = environment;

  constructor() { }

  isVideo(str: string): boolean {
    if (str && str !== '' && typeof str === 'string') {
      return str.toLowerCase().endsWith('.mp4') ||
        str.toLowerCase().endsWith('.avi') ||
        str.toLowerCase().endsWith('.flv') ||
        str.toLowerCase().endsWith('webm') ||
        str.toLowerCase().endsWith('.mkv') ||
        str.toLowerCase().endsWith('.wmv') ||
        str.toLowerCase().endsWith('.m4v') ||
        str.toLowerCase().endsWith('.3gp') ||
        str.toLowerCase().endsWith('.ogg');
    }
  }

  isPhoto(str: string): boolean {
    if (str && str !== '' && typeof str === 'string') {
      return str.toLowerCase().endsWith('.svg') ||
        str.toLowerCase().endsWith('.jpg')  ||
        str.toLowerCase().endsWith('.webp') ||
        str.toLowerCase().endsWith('webp')  ||
        str.toLowerCase().endsWith('.png')  ||
        str.toLowerCase().endsWith('.ico')  ||
        str.toLowerCase().endsWith('.jpeg') ||
        str.toLowerCase().endsWith('.jfif') ||
        str.toLowerCase().endsWith('.bmp')  ||
        str.toLowerCase().endsWith('.gif');
    }
  }

  upload(file: File, urlPath: String): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file && (this.isPhoto(file.name) || this.isVideo(file.name))) {
        reject();
      }

      const fileUploadParams =
      {
        Bucket: this.env.s3MediaBucket,
        Key: `${urlPath}_${new Date().getTime()}.${file.name.split('.').pop()}`,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type
      };

      s3Bucket.upload(fileUploadParams, (err: any, s3Data: any) => {
        if (err) {
          throw new Error(err);
        }
        else {
          resolve(encodeURI(this.env.cloudfrontUrl + fileUploadParams.Key));
        }
      });
    });
  }
}
