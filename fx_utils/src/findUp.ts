import { cwd } from 'process';
import { stat } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

type Options = {
  stopAt?: string;
};

const toPath = (urlOrPath: string | URL): string => (urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath);

export async function findUpDir(name: string, options: Options = {}) {
  const currentCwd = cwd();
  const { stopAt } = options;
  let directory = path.resolve(toPath(currentCwd));

  while (directory !== path.dirname(directory)) {
    const target = path.join(directory, name);

    try {
      const stats = await stat(target);
      if (stats.isDirectory()) {
        return target;
      }
    } catch {
      // 파일/폴더가 존재하지 않음
    }

    if (stopAt && directory === path.resolve(stopAt)) {
      break;
    }

    directory = path.dirname(directory);
  }

  return null;
}
