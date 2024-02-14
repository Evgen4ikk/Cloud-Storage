import { UploadedFile } from 'features/FileUploader';

export interface IFolder {
  name: string;
  files: UploadedFile[];
}
