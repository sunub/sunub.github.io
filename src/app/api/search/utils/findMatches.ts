import { eqKr, eqKrPos } from "./preprocess";

export function findMatches(query: string, data: string) {
  const results = [];
  const ql = query.length,
    dl = data.length;
  for (let i = 0; i <= dl - ql; i++) {
    let ok = true;
    for (let j = 0; j < ql; j++) {
      const qc = query[j],
        dc = data[i + j];
      if (j === ql - 1) {
        if (!eqKr(qc, dc)) {
          if (i + j + 1 < dl && eqKrPos(qc, dc, data[i + j + 1])) continue;
          ok = false;
          break;
        }
      } else {
        if (qc !== dc) {
          ok = false;
          break;
        }
      }
    }
    if (ok) results.push(data.slice(i, i + ql));
  }
  return results;
}
