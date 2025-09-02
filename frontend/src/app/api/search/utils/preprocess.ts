export function isKr(char: string): boolean {
  const c = char.charCodeAt(0);
  return ('ㄱ'.charCodeAt(0) <= c && c <= 'ㅎ'.charCodeAt(0)) || ('가'.charCodeAt(0) <= c && c <= '힣'.charCodeAt(0));
}

// Hangul syllable index relative to '가'
export function krNum(s: string): number {
  return s.charCodeAt(0) - '가'.charCodeAt(0);
}

// Given a Korean char, return possible decomposed forms: syllable w/o jongseong, and leading consonant
export function krList(s: string): string[] {
  const jaeumList = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const res = [s];
  const k = krNum(s);

  if (k >= 0) {
    if (k % 28 !== 0) {
      res.push(String.fromCharCode(Math.floor(k / 28) * 28 + '가'.charCodeAt(0)));
    }
    // leading consonant only
    res.push(jaeumList[Math.floor(k / 588)]);
  }
  return res;
}

// direct equality or loose Hangul match, plus case-insensitive for non-Korean
export function eqKr(s: string, d: string): boolean {
  if (isKr(s) && isKr(d)) {
    return krList(d).includes(s);
  }
  return s.toLowerCase() === d.toLowerCase();
}

export function eqKrPos(s: string, d: string, dNext: string = ''): boolean {
  // 완성 음절 여부를 판별하는 함수 (ㄱ, ㅁ 등은 제외)
  const isFullSyllable = (ch: string) =>
    ch.charCodeAt(0) >= '가'.charCodeAt(0) && ch.charCodeAt(0) <= '힣'.charCodeAt(0);

  if (!(isFullSyllable(s) && isFullSyllable(d) && (dNext === '' || isFullSyllable(dNext)))) {
    return false;
  }

  const jaeumList = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const krPos: [number, number][] = [
    [0, 0],
    [1, 0],
    [2, 1],
    [2, 9],
    [4, 2],
    [1, 12],
    [2, 18],
    [7, 3],
    [8, 5],
    [1, 0],
    [2, 6],
    [3, 7],
    [4, 9],
    [5, 16],
    [6, 17],
    [7, 18],
    [16, 6],
    [17, 7],
    [1, 9],
    [19, 9],
    [20, 10],
    [21, 11],
    [22, 12],
    [23, 14],
    [24, 15],
    [25, 16],
    [26, 17],
    [27, 18],
  ];

  const num = krNum(s);
  const jong = num % 28;
  const [leadDiff, nextChoIdx] = krPos[jong];
  const leadChar = String.fromCharCode(s.charCodeAt(0) - leadDiff);
  const choChar = jaeumList[nextChoIdx];
  return leadChar === d && krList(dNext).includes(choChar);
}
