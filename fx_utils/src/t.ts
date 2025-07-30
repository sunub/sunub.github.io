import { createReadStream } from 'fs';
import { pipeline } from 'stream';
import { findUpDir } from './findUp';
import { opendir } from 'fs/promises';
import { join } from 'path';

(async () => {
  const dirPath = (await findUpDir('tmp')) ?? '';

  const dirInfo = await opendir(dirPath);
  const it = dirInfo[Symbol.asyncIterator]();
  const file = (await it.next()).value;

  const stream = createReadStream(join(dirPath, file.name));
  console.log(stream);
})();
