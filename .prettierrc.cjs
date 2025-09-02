module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^vitest', '<THIRD_PARTY_MODULES>', '^@(.*)$', '^[.]/', '^[.]{2,}/'],
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: [
        'frontend/src/**/index.ts',
        'backend/src/**/index.ts',
        'fx_utils/src/**/index.ts',
        'frontend/db/**/index.ts',
      ],
      options: {
        plugins: [
          require.resolve('@trivago/prettier-plugin-sort-imports'),
          require.resolve('prettier-plugin-sort-re-exports'),
        ],
      },
    },
  ],
};
