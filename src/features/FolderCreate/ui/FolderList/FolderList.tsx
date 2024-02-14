import { IFolder } from 'features/FolderCreate/types/folder';
import { FC } from 'react';
import Grid from 'shared/ui/Grid/Grid';
import { FolderItem } from '../FolderItem/FolderItem';
import cls from './FolderList.module.scss';

interface IFolderList {
  folders: IFolder[];
}

export const FolderList: FC<IFolderList> = ({ folders }) => {
  return (
    <div className={cls.folderList}>
      <h2>Folders:</h2>
      <Grid>
        {folders.length == 0 ? (
          <>No folders created</>
        ) : (
          <>
            {folders.map(folder => (
              <FolderItem key={folder.name} folder={folder} />
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};
