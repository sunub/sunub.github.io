"use client";
import dynamic from "next/dynamic";
import { CodeBlockSkeleton } from "./CodeBlockSkeleton";

const DynamicCodeBlock = dynamic(
	() => import("./CodeBlock").then((mod) => mod.CodeBlock),
	{
		ssr: false,
		loading: () => <CodeBlockSkeleton />,
	},
);

export default DynamicCodeBlock;
