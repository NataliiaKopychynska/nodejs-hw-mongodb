import cloudinary from 'cloudinary';
import getEnvVar from '../utils/getEnvVar.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  //   cloud_name: 'dokj7aq0x',
  api_key: getEnvVar('CLOUDINARY_API_KEY'),
  api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
