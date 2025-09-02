function convertTableBlockToHTML(tableLines: string[]) {
  if (tableLines.length < 2) return tableLines.join('\n');

  const headers = tableLines[0]
    .trim()
    .split('|')
    .map(header => header.trim())
    .filter(header => header.length > 0);
  const rows = tableLines.slice(2).map(line =>
    line
      .trim()
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)
  );

  const thead = `<thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map(row => `<tr>${row.map(cell => `<td className="p-4 text-[.95rem] border-b">${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody>`;
  return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

function convertMarkdownTables(source: string) {
  const lines = source.split('\n');
  const result = [];

  let i = 0;
  while (i < lines.length) {
    const codeBlockRegexp = /^(`{3,}|~{3,})([a-zA-Z0-9+-]*)?/g;
    if (codeBlockRegexp.test(lines[i])) {
      while (i < lines.length && !codeBlockRegexp.test(lines[i])) {
        result.push(lines[i]);
        i++;
      }
    } else if (lines[i].trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const htmlTable = convertTableBlockToHTML(tableLines);
      result.push(htmlTable);
    } else {
      result.push(lines[i]);
      i++;
    }
  }
  return result.join('\n');
}

export { convertMarkdownTables };
