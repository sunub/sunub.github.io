import { describe, expect, test } from "vitest";
import { convertTableBlockToHTML } from "@/components/ui/customMdxRemote";

describe("convertTableBlockToHTML", () => {
	test("normalizes void html tags inside markdown table cells for MDX", () => {
		const html = convertTableBlockToHTML([
			"| 프로세스 | 프로세스가 제어하는 부분 |",
			"| -------- | ------------------------ |",
			"| 브라우저 프로세스 | 주소 표시줄을 제어한다. <br>권한이 필요한 부분도 처리한다. |",
		]);

		expect(html).toContain("<br />");
		expect(html).not.toContain("<br>");
	});
});
