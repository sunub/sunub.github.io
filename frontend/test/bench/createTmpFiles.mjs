import { execa } from 'execa';
import ora from 'ora';
import path from 'path';

const shellCodePath = path.join(process.cwd(), 'test', 'test.sh');
try {
  await execa`chmod 777 ${shellCodePath}`;
} catch (error) {
  console.error(error);
  throw error;
}

const execShellSpinner = ora('테스트용 포스트 생성 스크립트를 실행하는 중...').start();
try {
  await execa`${shellCodePath}`;
} catch (error) {
  execShellSpinner.fail('스크립트 실행 중 오류 발생');
  console.error(error);
  throw error;
}
execShellSpinner.succeed('스크립트 실행 완료');
