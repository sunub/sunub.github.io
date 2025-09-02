import React from 'react';
import { codeToHtml } from 'shiki';
import { Clipboard } from './Clipboard';
import { codeFont } from './Font';
import { CodeBlockWrapper, InlineCodeStyle } from '../style';

const languageMap = {
  'language-html': 'html',
  'language-js': 'javascript',
  'language-jsx': 'jsx',
  'language-ts': 'typescript',
  'language-tsx': 'tsx',
  'language-sh': 'bash',
  'language-md': 'markdown',
  'language-yaml': 'yaml',
  'language-json': 'json',
  'language-css': 'css',
  'language-c++': 'cpp',
} as const;

type LanguageKey = keyof typeof languageMap;

async function CodeBlock({ className, children, ...props }: { className: string; children: React.ReactNode }) {
  const codeToString = React.Children.toArray(children)
    .filter(child => typeof child === 'string')
    .join('');

  try {
    const html = await codeToHtml(codeToString, {
      themes: {
        light: 'vitesse-light',
        dark: 'tokyo-night',
      },
      lang: languageMap[className as LanguageKey] || 'plaintext',
    });
    return (
      <CodeBlockWrapper>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Clipboard text={codeToString} />
      </CodeBlockWrapper>
    );
  } catch (error) {
    console.error('Shiki를 사용하여 코드 하이라이팅을 변환하는 동안 오류가 발생했습니다.', error);
    return (
      <pre className={`${className} ${codeFont.className}`} {...props}>
        <code>{codeToString}</code>
      </pre>
    );
  }
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return <InlineCodeStyle className={codeFont.className}>{children}</InlineCodeStyle>;
}

export { CodeBlock, InlineCode };
