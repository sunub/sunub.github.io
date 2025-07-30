// import { pipeline } from 'stream/promises';
// import { findUpDir } from './findUp';
// import { createReadStream } from 'fs';
// import { opendir, readFile } from 'fs/promises';
// import { join } from 'path';
// import { fx } from './fx';
// import matter from 'gray-matter';
// import { Transform, Writable } from 'stream';
// import ora from 'ora';

// type PostData = {
//   content: string;
//   data: { [key: string]: any };
// };

// // async function usePipelineCode() {
// //   const postsPath = (await findUpDir('tmp')) ?? '';

// //   async function* getFiles(dir: string): AsyncIterable<string> {
// //     const dirIterable = await opendir(dir);
// //     for await (const dirent of dirIterable) {
// //       if (dirent.isFile()) {
// //         yield join(dir, dirent.name);
// //       } else {
// //         yield* getFiles(join(dir, dirent.name));
// //       }
// //     }
// //   }

// //   class MatterTransform extends Transform {
// //     _transform(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null, data?: any) => void) {
// //       try {
// //         const { content, data } = matter(chunk.toString());
// //         this.push(JSON.stringify({ content, data }) + '\n');
// //         callback();
// //       } catch (error) {
// //         callback(error as Error);
// //       }
// //     }
// //   }

// //   class MemoryWritable extends Writable {
// //     public chunks: Buffer[] = [];
// //     _write(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
// //       this.chunks.push(chunk);
// //       callback();
// //     }
// //     getData(): string {
// //       return Buffer.concat(this.chunks).toString();
// //     }
// //   }

// //   const startTime = Date.now();
// //   const startMem = process.memoryUsage().rss;

// //   // const results: string[] = [];
// //   // const dirIterable = fx(await opendir(postsPath)).map(dirent => getFiles(join(postsPath, dirent.name)));
// //   const results: string[] = [];
// //   for await (const file of getFiles(postsPath)) {
// //     const memWritable = new MemoryWritable();
// //     await pipeline(createReadStream(file), new MatterTransform(), memWritable);
// //     results.push(memWritable.getData());
// //   }
// //   // for await (const file of fx(dirent).filter(file => file.endsWith('.md') || file.endsWith('.mdx'))) {
// //   //   const memWritable = new MemoryWritable();
// //   //   await pipeline(createReadStream(file), new MatterTransform(), memWritable);
// //   //   results.push(memWritable.getData());
// //   // }

// //   const endTime = Date.now();
// //   const endMem = process.memoryUsage().rss;

// //   console.log('처리된 파일 개수:', results.length);
// //   console.log('작업 시간(ms):', endTime - startTime);
// //   console.log('메모리 사용량 변화(MB):', ((endMem - startMem) / 1024 / 1024).toFixed(2));
// // }

// async function useNonStreamCode() {
//   const postsPath = (await findUpDir('tmp')) ?? '';

//   // 이 함수는 스트림 대신 재귀적으로 모든 파일 경로를 찾습니다.
//   async function getAllFilePaths(dir: string): Promise<string[]> {
//     let filePaths: string[] = [];
//     const dirIterable = await opendir(dir);
//     for await (const dirent of dirIterable) {
//       const fullPath = join(dir, dirent.name);
//       if (dirent.isFile()) {
//         filePaths.push(fullPath);
//       } else if (dirent.isDirectory()) {
//         filePaths = filePaths.concat(await getAllFilePaths(fullPath)); // 재귀적으로 하위 디렉토리 탐색
//       }
//     }
//     return filePaths;
//   }

//   const startTime = Date.now();
//   const startMem = process.memoryUsage().rss;

//   const results: string[] = [];
//   const processedFiles: string[] = []; // 디버깅을 위해 실제로 처리된 파일 경로를 저장

//   // 모든 파일 경로를 먼저 가져옵니다.
//   const allFiles = await getAllFilePaths(postsPath);

//   // generator에서 모든 파일을 모읍니다.
//   let allFilesToProcess: string[] = [];
//   for await (const files of allFiles) {
//     allFilesToProcess = allFilesToProcess.concat(files);
//   }

//   // '.md' 또는 '.mdx' 파일만 필터링합니다.
//   const markdownFiles = allFilesToProcess.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

//   // 각 파일을 비동기적으로 읽고 처리합니다.
//   for (const file of markdownFiles) {
//     try {
//       // 파일 전체를 메모리로 읽어옵니다.
//       const fileContent = await readFile(file, { encoding: 'utf8' });

//       // gray-matter로 파싱합니다.
//       const { content, data } = matter(fileContent);

//       // 결과를 JSON 문자열로 변환하여 저장합니다.
//       results.push(JSON.stringify({ content, data }) + '\n');
//       processedFiles.push(file); // 처리된 파일 추가
//     } catch (error) {
//       console.error(`Error processing file ${file}:`, error);
//     }
//   }

//   // 디버깅: 종료 시간, 메모리 사용량 기록
//   const endTime = Date.now();
//   const endMem = process.memoryUsage().rss;

//   console.log('--- 스트림/지연 평가 없는 방식 결과 ---');
//   console.log('처리된 파일 개수:', results.length);
//   console.log('작업 시간(ms):', endTime - startTime);
//   console.log('메모리 사용량 변화(MB):', ((endMem - startMem) / 1024 / 1024).toFixed(2));
//   // console.log('처리된 파일 목록:', processedFiles); // 필요하면 주석 해제
//   // console.log('모든 결과:', results); // 필요하면 주석 해제
// }

// async function useLazyEvaluationCode() {
//   const postsPath = (await findUpDir('tmp')) ?? '';

//   async function* getFiles(dir: string): AsyncIterable<string> {
//     const dirIterable = await opendir(dir);
//     for await (const dirent of dirIterable) {
//       if (dirent.isFile()) {
//         yield join(dir, dirent.name);
//       } else {
//         yield* getFiles(join(dir, dirent.name));
//       }
//     }
//   }

//   const results: string[] = [];
//   const startTime = Date.now();
//   const startMem = process.memoryUsage().rss;

//   const files = await fx(await getFiles(postsPath))
//     .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
//     .map(async file => matter(await readFile(file, 'utf8')))
//     .toArray();

//   const endTime = Date.now();
//   const endMem = process.memoryUsage().rss;

//   console.log('--- 비동기 지연 평가로 수행한 결과 ---');
//   console.log('처리된 파일 개수:', files.length);
//   console.log('작업 시간(ms):', endTime - startTime);
//   console.log('메모리 사용량 변화(MB):', ((endMem - startMem) / 1024 / 1024).toFixed(2));
// }

// (async () => {
//   const lazyEvaluationSpinner = ora('비동기 지연 평가 방식으로 파일 처리 중...').start();
//   await useLazyEvaluationCode();
//   lazyEvaluationSpinner.succeed('비동기 지연 평가 방식으로 파일 처리 완료!');
//   console.log('\n');
//   const nonStreamSpinner = ora('스트림/지연 평가 없는 방식으로 파일 처리 중...').start();
//   await useNonStreamCode();
//   nonStreamSpinner.succeed('스트림/지연 평가 없는 방식으로 파일 처리 완료!');
// })();
