import { eqKr, eqKrPos, isKr } from './preprocess';

export function findMatches(query: string, data: string): string[] {
  const qLower = query.toLowerCase();
  const dLower = data.toLowerCase();

  const results: string[] = [];
  const ql = qLower.length;
  const dl = dLower.length;

  for (let i = 0; i <= dl - ql; i++) {
    let ok = true;
    for (let j = 0; j < ql; j++) {
      const qc = qLower[j];
      const dc = dLower[i + j];

      if (j === ql - 1) {
        const origQc = query[j];
        const origDc = data[i + j];
        const origDcNext = data[i + j + 1] ?? '';

        if (isKr(origQc) && isKr(origDc)) {
          if (!eqKr(origQc, origDc)) {
            if (eqKrPos(origQc, origDc, origDcNext)) {
              continue;
            }
            ok = false;
            break;
          }
        } else {
          if (qc !== dc) {
            ok = false;
            break;
          }
        }
      } else {
        if (qc !== dc) {
          ok = false;
          break;
        }
      }
    }
    if (ok) {
      results.push(data.slice(i, i + ql));
    }
  }

  return results;
}
