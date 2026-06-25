#!/usr/bin/env bash

set -euo pipefail

NUM_FILES="${1:-5000}"
BODY_REPEAT="${2:-64}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP_DIR="$SCRIPT_DIR/tmp"
POSTS_DIR="$TMP_DIR/posts"
CATEGORIES=("web" "algorithm" "cs" "code" "ai")

if ! [[ "$NUM_FILES" =~ ^[0-9]+$ ]] || ! [[ "$BODY_REPEAT" =~ ^[0-9]+$ ]]; then
	echo "Usage: ./generate-posts.sh [num_files] [body_repeat]"
	exit 1
fi

mkdir -p "$POSTS_DIR"
find "$POSTS_DIR" -mindepth 1 -delete 2>/dev/null || true

for category in "${CATEGORIES[@]}"; do
	mkdir -p "$POSTS_DIR/$category"
done

LOREM_CHUNK="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
BODY_CONTENT=""

for ((repeat = 0; repeat < BODY_REPEAT; repeat++)); do
	BODY_CONTENT+="$LOREM_CHUNK"$'\n'
done

echo "benchmark dataset path: $POSTS_DIR"
echo "num files: $NUM_FILES"
echo "body repeat: $BODY_REPEAT"

category_count="${#CATEGORIES[@]}"
files_per_category=$((NUM_FILES / category_count))
remainder=$((NUM_FILES % category_count))
created=0
started_at=$(date +%s)

for index in "${!CATEGORIES[@]}"; do
	category="${CATEGORIES[$index]}"
	target_count="$files_per_category"
	if [ "$index" -lt "$remainder" ]; then
		target_count=$((target_count + 1))
	fi

	echo "[$category] creating $target_count files..."

	for ((file_index = 1; file_index <= target_count; file_index++)); do
		created=$((created + 1))
		month=$((created % 12 + 1))
		day=$((created % 28 + 1))
		file_path="$POSTS_DIR/$category/$category-post-$file_index.mdx"

		cat >"$file_path" <<EOF
---
title: "$category Post Title $file_index"
date: "2025-$(printf "%02d" "$month")-$(printf "%02d" "$day")"
tags: ["tech", "benchmark", "$category"]
summary: "Benchmark fixture for $category post $file_index"
slug: "$category-post-$file_index"
category: "$category"
completed: true
---

$BODY_CONTENT
EOF

		if ((created % 500 == 0)); then
			echo "created $created / $NUM_FILES files..."
		fi
	done
done

finished_at=$(date +%s)
elapsed=$((finished_at - started_at))

echo "done: created $created files in ${elapsed}s"
