import React from 'react';

interface File {
  name: string;
  data: string;
}

interface Folder {
  name: string;
  files: File[];
}

export const FileUploader: React.FC = () => {
  return <div></div>;
};
