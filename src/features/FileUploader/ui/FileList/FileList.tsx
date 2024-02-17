import { UploadedFile } from 'features/FileUploader/types/file';
import { FC } from 'react';
import Grid from 'shared/ui/Grid/Grid';
import { FileItem } from '../FileItem/FileItem';
import cls from './FileList.module.scss';

interface IFileList {
  files: UploadedFile[];
  setFiles: (files: UploadedFile[]) => void;
}

export const FileList: FC<IFileList> = ({ files, setFiles }) => {
  const handleDeleteFile = (fileId: number) => {
    const updatedFiles = files.filter((f: UploadedFile) => f.id !== fileId);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleRenameFile = (fileId: number, newName: string) => {
    const updatedFiles = files.map((f: UploadedFile) => {
      if (f.id === fileId) {
        return { ...f, name: newName };
      }
      return f;
    });
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleDownloadFile = (fileId: number) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      const downloadLink = document.createElement('a');
      downloadLink.href = file.dataUrl;
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className={cls.fileList}>
      <h2>Files:</h2>
      <Grid>
        {files.length == 0 ? (
          <>No files uploaded</>
        ) : (
          <>
            {files.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onDelete={() => {
                  handleDeleteFile(file.id);
                }}
                onRename={(newName: string) => {
                  handleRenameFile(file.id, newName);
                }}
                onDownload={() => {
                  handleDownloadFile(file.id);
                }}
              />
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};
