import path from "node:path";
import { execa } from "execa";
import ora from "ora";

const removeDirSpinner = ora("임시 디렉토리 제거 중...").start();
const tmpDirPath = path.join(process.cwd(), "tmp");
try {
	await execa`rm -rf ${tmpDirPath}`;
	removeDirSpinner.succeed("임시 디렉토리 제거 완료");
} catch (error) {
	removeDirSpinner.fail("임시 디렉토리 제거 중 오류 발생");
	console.error(error);
	throw error;
}
