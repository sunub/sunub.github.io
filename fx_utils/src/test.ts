// import { pipeline } from 'stream/promises';
// import { findUpDir } from './findUp';
// import { createReadStream } from 'fs';
// import { opendir } from 'fs/promises';
// import { join } from 'path';
// import matter from 'gray-matter';
// import { Transform, TransformCallback, Writable } from 'stream';
// import ora, { Ora } from 'ora';
// import { fx } from './fx';
// import { chunk } from '@fxts/core';

// // Semaphore 클래스 - 동시성 제어용
// class Semaphore {
//   private permits: number;
//   private waitQueue: (() => void)[] = [];

//   constructor(permits: number) {
//     this.permits = permits;
//   }

//   async acquire(): Promise<void> {
//     if (this.permits > 0) {
//       this.permits--;
//       return;
//     }

//     return new Promise(resolve => {
//       this.waitQueue.push(resolve);
//     });
//   }

//   release(): void {
//     this.permits++;
//     const next = this.waitQueue.shift();
//     if (next) {
//       this.permits--;
//       next();
//     }
//   }
// }

// // --- 최종 스트림 처리 함수 ---
// async function usePipelineStream(spinner: Ora) {
//   const postsPath = (await findUpDir('tmp')) ?? '';

//   // 안전한 디렉토리 탐색 함수
//   async function* getFiles(dir: string): AsyncIterable<string> {
//     let dirIterable;
//     let isClosed = false;
//     try {
//       dirIterable = await opendir(dir);
//       for await (const dirent of dirIterable) {
//         const fullPath = join(dir, dirent.name);
//         if (dirent.isFile()) {
//           yield fullPath;
//         } else if (dirent.isDirectory()) {
//           yield* getFiles(fullPath);
//         }
//       }
//       // for await 루프가 정상 완료되면 자동으로 닫히므로 플래그 설정
//       isClosed = true;
//     } catch (error) {
//       console.error(`디렉토리 접근 오류: ${dir}`, error);
//       // 에러 발생시에만 명시적으로 닫기
//       if (dirIterable && !isClosed) {
//         try {
//           await dirIterable.close();
//         } catch (closeError) {
//           // 닫기 실패는 무시
//         }
//       }
//     }
//   }

//   // 메모리 효율적인 frontmatter 파싱을 위한 최적화된 Transform
//   class OptimizedMatterTransform extends Transform {
//     private buffer = '';
//     private frontmatterProcessed = false;
//     private headerEnd = -1;

//     constructor() {
//       super({ objectMode: true });
//     }

//     _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback) {
//       this.buffer += chunk.toString();

//       // frontmatter 부분만 찾아서 처리 (전체 파일 로딩 방지)
//       if (!this.frontmatterProcessed) {
//         this.headerEnd = this.buffer.indexOf('\n---\n');
//         if (this.headerEnd === -1) {
//           this.headerEnd = this.buffer.indexOf('\n---\r\n');
//         }

//         // frontmatter 완전히 로드되었을 때만 파싱
//         if (this.headerEnd > 0) {
//           try {
//             const frontmatterSection = this.buffer.substring(0, this.headerEnd + 5);
//             const parsed = matter(frontmatterSection);

//             // 콘텐츠 길이는 추정치로 계산 (메모리 절약)
//             const estimatedContentLength = this.buffer.length - frontmatterSection.length;

//             this.push({
//               data: parsed.data,
//               contentLength: estimatedContentLength,
//               hasContent: estimatedContentLength > 0,
//             });

//             this.frontmatterProcessed = true;
//             this.buffer = ''; // 즉시 버퍼 정리
//           } catch (error) {
//             // 파싱 실패시 기본값
//             this.push({
//               data: {},
//               contentLength: this.buffer.length,
//               hasContent: this.buffer.length > 0,
//             });
//             this.frontmatterProcessed = true;
//             this.buffer = '';
//           }
//         }
//       }

//       callback();
//     }

//     _flush(callback: TransformCallback): void {
//       // 스트림 완료시 남은 버퍼 정리
//       if (!this.frontmatterProcessed && this.buffer.length > 0) {
//         try {
//           const parsed = matter(this.buffer);
//           this.push({
//             data: parsed.data,
//             contentLength: parsed.content.length,
//             hasContent: parsed.content.length > 0,
//           });
//         } catch (error) {
//           this.push({
//             data: {},
//             contentLength: this.buffer.length,
//             hasContent: this.buffer.length > 0,
//           });
//         }
//       }

//       // 메모리 해제
//       this.buffer = '';
//       this.frontmatterProcessed = false;
//       this.headerEnd = -1;

//       callback();
//     }
//   }

//   // 메모리 효율적인 파일 처리 클래스 (개선된 버전)
//   class OptimizedFileProcessor {
//     public count = 0;
//     public totalBytes = 0;
//     private spinner: Ora;
//     private semaphore: Semaphore;

//     constructor(spinner: Ora, maxConcurrency: number = 50) {
//       this.spinner = spinner;
//       this.semaphore = new Semaphore(maxConcurrency);
//     }

//     async processFile(filePath: string): Promise<void> {
//       await this.semaphore.acquire();

//       try {
//         const source = createReadStream(filePath, {
//           highWaterMark: 8192, // 8KB 청크로 제한하여 메모리 사용량 줄임
//         });
//         const parser = new OptimizedMatterTransform();

//         return new Promise<void>((resolve, reject) => {
//           let processedData: any = null;

//           const cleanup = () => {
//             // 명시적 정리
//             parser.removeAllListeners();
//             source.removeAllListeners();

//             // 스트림 정리
//             if (!source.destroyed) {
//               source.destroy();
//             }
//             if (!parser.destroyed) {
//               parser.destroy();
//             }
//           };

//           parser.on('data', (data: { data: any; contentLength: number; hasContent: boolean }) => {
//             processedData = data;
//           });

//           parser.on('end', () => {
//             try {
//               if (processedData) {
//                 this.count++;
//                 this.totalBytes += processedData.contentLength;
//               }

//               if (this.count % 100 === 0) {
//                 this.spinner.text = `최적화된 스트림 방식으로 파일 처리 중... (${this.count.toLocaleString()}개 완료)`;
//               }

//               // 데이터 즉시 해제
//               processedData = null;

//               cleanup();
//               resolve();
//             } catch (error) {
//               cleanup();
//               reject(error);
//             }
//           });

//           parser.on('error', error => {
//             cleanup();
//             reject(error);
//           });

//           source.on('error', error => {
//             cleanup();
//             reject(error);
//           });

//           // 파이프라인 연결
//           source.pipe(parser);
//         });
//       } finally {
//         this.semaphore.release();
//       }
//     }

//     getResults() {
//       return { count: this.count, totalBytes: this.totalBytes };
//     }
//   }

//   const startTime = Date.now();
//   const startMem = process.memoryUsage().rss;
//   const processor = new OptimizedFileProcessor(spinner);

//   const batchSize = 500; // 500개씩 배치 처리
//   for await (const fn of fx(await getFiles(postsPath))
//     .filter(filename => filename.endsWith('.md') || filename.endsWith('.mdx'))
//     .chunk(batchSize)
//     .forEach(async batchFiles => {
//       await Promise.all([
//         batchFiles.map(async fileName => {
//           try {
//             await processor.processFile(fileName);
//           } catch {
//             //
//           }
//         }),
//       ]);

//       // 800MB 초과시
//       const memUsage = process.memoryUsage();
//       if (memUsage.heapUsed > 800 * 1024 * 1024) {
//         spinner.text = `메모리 정리 중... (현재: ${(memUsage.heapUsed / 1024 / 1024).toFixed(0)}MB)`;
//         await new Promise(resolve => setTimeout(resolve, 200));
//       }
//     })) {
//   }

//   const endTime = Date.now();
//   const endMem = process.memoryUsage().rss;
//   const { count, totalBytes } = processor.getResults();

//   return {
//     count,
//     totalBytes,
//     time: endTime - startTime,
//     mem: (endMem - startMem) / 1024 / 1024,
//   };
// }

// // --- 결과 출력 및 실행 ---
// function printAverage(
//   label: string,
//   results: { count: number; time: number; mem: number; totalBytes: number }[],
//   repeat: number
// ) {
//   if (results.length === 0) {
//     console.log(`\n--- ${label} ---`);
//     console.log('처리된 결과가 없습니다.');
//     return;
//   }
//   const avgTime = results.reduce((a, b) => a + b.time, 0) / repeat;
//   const avgMem = results.reduce((a, b) => a + b.mem, 0) / repeat;
//   const avgCount = results.reduce((a, b) => a + b.count, 0) / repeat;
//   const avgBytes = results.reduce((a, b) => a + b.totalBytes, 0) / repeat;

//   console.log(`\n--- ${label} 평균 결과 (반복 ${repeat}회) ---`);
//   console.log('처리된 파일 개수:', avgCount.toFixed(0));
//   console.log(`처리된 용량: ${(avgBytes / 1024 / 1024).toFixed(2)} MB`);
//   console.log(`작업 시간: ${(avgTime / 1000).toFixed(2)}초`);
//   console.log(`메모리 사용량 변화: ${avgMem.toFixed(2)} MB`);
//   console.log(`처리 속도: ${(avgCount / (avgTime / 1000)).toFixed(2)} 파일/초`);
// }

// (async () => {
//   const results: any[] = [];
//   const spinner = ora(`최적화된 스트림 방식으로 파일 처리 중...`).start();

//   try {
//     // 힙 메모리 한계 모니터링
//     const initialMem = process.memoryUsage();
//     console.log(`초기 메모리 사용량: ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);

//     results.push(await usePipelineStream(spinner));

//     const finalMem = process.memoryUsage();
//     console.log(`최종 메모리 사용량: ${(finalMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);

//     spinner.succeed(`최적화된 스트림 방식 완료!`);
//     printAverage('최적화된 스트림 방식', results, 1);
//   } catch (error) {
//     spinner.fail('최적화된 스트림 방식 처리 중 오류 발생');
//     console.error(error);

//     // 에러 발생시 메모리 상태 출력
//     const errorMem = process.memoryUsage();
//     console.log(
//       `에러 발생시 메모리: Heap Used=${(errorMem.heapUsed / 1024 / 1024).toFixed(2)}MB, RSS=${(
//         errorMem.rss /
//         1024 /
//         1024
//       ).toFixed(2)}MB`
//     );
//   }
// })();
