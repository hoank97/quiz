import { v2 } from 'cloudinary';
export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: () => {
    return v2.config({
      cloud_name: 'duqlwltbc',
      api_key: '558848736658126',
      api_secret: 'hnHUNn0BZUiFQlpBqFXtj6MdbzI',
    });
  },
};
