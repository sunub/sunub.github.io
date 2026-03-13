"use client";

import type React from "react";
import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

function Table({
	children,
	...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
	return (
		<TableOuter>
			<StyledTable {...props}>{children}</StyledTable>
		</TableOuter>
	);
}

function TableHead({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <StyledTableHead {...props}>{children}</StyledTableHead>;
}

function TableBody({
	children,
	...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
	return <StyledTableBody {...props}>{children}</StyledTableBody>;
}

function TableRow({
	children,
	...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
	return <StyledTableRow {...props}>{children}</StyledTableRow>;
}

function TableHeaderCell({
	children,
	...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
	return <StyledTableHeaderCell {...props}>{children}</StyledTableHeaderCell>;
}

function TableCell({
	children,
	...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
	return <StyledTableCell {...props}>{children}</StyledTableCell>;
}

const TableOuter = styled.div`
	${postContentThemeVariables}

	margin: 2rem 0;
	overflow-x: auto;
	border-radius: 1rem;
	border: 2px solid var(--post-border-strong);
	background: var(--post-surface);
	box-shadow: 4px 4px 0 var(--post-shadow-accent);
`;

const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	min-width: 32rem;
`;

const StyledTableHead = styled.thead`
	background: color-mix(in oklch, var(--post-accent) 10%, var(--post-surface) 90%);

	html[data-color-theme="dark"] & {
		background: #16161e;
	}
`;

const StyledTableBody = styled.tbody`
	& > tr:nth-child(even) {
		background: var(--post-table-stripe);
	}
`;

const StyledTableRow = styled.tr`
	border-bottom: 1px solid var(--post-border-soft);
`;

const cellStyle = `
	padding: 0.95rem 1rem;
	text-align: left;
	vertical-align: top;
	font-size: 0.95rem;
	line-height: 1.6;
	color: var(--post-body);
`;

const StyledTableHeaderCell = styled.th`
	${postContentThemeVariables}
	${cellStyle}

	color: var(--post-body-strong);
	font-weight: 800;
`;

const StyledTableCell = styled.td`
	${postContentThemeVariables}
	${cellStyle}
`;

export { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow };
