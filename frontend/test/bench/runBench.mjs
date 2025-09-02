import { execa, execaNode } from 'execa';
import path from 'path';

const testPath = path.join(process.cwd(), 'test');
const options = { stdio: 'inherit' };

const commandsToRun = [
  {
    description: '임시파일 생성',
    action: () => execaNode(path.join(testPath, 'createTmpFiles.mjs'), options),
  },
  {
    description: '벤치마크 실행',
    action: () => execa('vitest', ['bench', '--watch=false', './test/blog_stree.bench.ts'], options),
  },
];

try {
  for (const cmd of commandsToRun) {
    console.log(`--- 실행 시작: ${cmd.description} ---`);
    await cmd.action();
    console.log(`--- 실행 완료: ${cmd.description} ---`);
  }
  console.log('✅ 모든 명령어가 순서대로 실행되었습니다.');
} catch (error) {
  console.error('명령어 실행 중 오류 발생 :', error.shortMessage);
  process.exit(1);
} finally {
  console.log('--- 임시파일 제거 시작 ---');
  await execaNode(path.join(testPath, 'removeTmpFiles.mjs'), options);
  console.log('--- 임시파일 제거 완료 ---');
}
