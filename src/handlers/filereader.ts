import { readdirSync, type PathLike } from 'fs';
import { join, extname } from 'path';

export const Filereader = (dir: PathLike): string[] => {
  try {
    const files = [];
    const directoryData = readdirSync(dir);

    for (const file of directoryData) {
      const filePath = join(dir.toString(), file);

      if (extname(filePath) === '.ts'){
        files.push(filePath);
      } else {
        files.push(...Filereader(filePath));
      }
    }

    return files;
  } catch (error) {
    return [];
  }
};