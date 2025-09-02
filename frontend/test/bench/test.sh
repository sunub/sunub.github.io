#!/bin/bash

# 생성할 파일 개수 (전체)
NUM_FILES=250000

# tmp 디렉토리 경로 (현재 스크립트가 실행되는 디렉토리를 기준으로 함)
TMP_DIR="./tmp"

# 카테고리 배열 정의
CATEGORIES=("web" "algorithm" "cs" "code")
NUM_CATEGORIES=${#CATEGORIES[@]}

# 각 카테고리별 파일 개수 계산 (균등 분배)
FILES_PER_CATEGORY=$((NUM_FILES / NUM_CATEGORIES))
REMAINING_FILES=$((NUM_FILES % NUM_CATEGORIES))

echo "대상 디렉토리: $TMP_DIR"
echo "카테고리별 파일 개수: $FILES_PER_CATEGORY개 (나머지 $REMAINING_FILES개는 첫 번째 카테고리에 추가)"

# tmp 디렉토리가 없으면 생성
if [ ! -d "$TMP_DIR" ]; then
  mkdir -p "$TMP_DIR"
  echo "'$TMP_DIR' 디렉토리가 생성되었습니다."
else
  echo "'$TMP_DIR' 디렉토리가 이미 존재합니다. 기존 파일이 덮어쓰여질 수 있습니다."
fi

# 각 카테고리 디렉토리 생성
for category in "${CATEGORIES[@]}"; do
  CATEGORY_DIR="$TMP_DIR/$category"
  if [ ! -d "$CATEGORY_DIR" ]; then
    mkdir -p "$CATEGORY_DIR"
    echo "'$CATEGORY_DIR' 디렉토리가 생성되었습니다."
  fi
done

echo "$NUM_FILES개의 더미 .md 파일 생성을 시작합니다 (카테고리별 폴더 구조)..."

START_TIME=$(date +%s) # 시작 시간 기록

# 긴 Lorem ipsum 텍스트 템플릿
# 약 1KB 정도의 텍스트입니다. 이를 100번 반복하면 파일당 100KB가 됩니다.
LOREM_IPSUM_CHUNK="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
"
# 본문을 100번 반복하여 약 100KB 크기로 만듭니다.
LONG_CONTENT=""
for (( k=1; k<=100; k++ )); do # 이전보다 100배 더 긴 본문을 위해 100번 반복
  LONG_CONTENT+="$LOREM_IPSUM_CHUNK"
done

# 전체 파일 카운터
total_file_count=0

# 각 카테고리별로 파일 생성
for cat_index in "${!CATEGORIES[@]}"; do
  category="${CATEGORIES[$cat_index]}"
  
  # 첫 번째 카테고리에는 나머지 파일들도 추가
  if [ $cat_index -eq 0 ]; then
    files_to_create=$((FILES_PER_CATEGORY + REMAINING_FILES))
  else
    files_to_create=$FILES_PER_CATEGORY
  fi
  
  echo "[$category] 카테고리에서 $files_to_create개 파일 생성 중..."
  
  for (( i=1; i<=files_to_create; i++ )); do
    total_file_count=$((total_file_count + 1))
    
    FILE_NAME="${category}-post-$i.mdx"
    CATEGORY_DIR="$TMP_DIR/$category"
    FILE_PATH="$CATEGORY_DIR/$FILE_NAME"

    # FrontMatterSchema에 맞는 frontmatter 생성
    TITLE="$category Post Title $i"
    DATE="2025-$(printf "%02d" $(( (total_file_count % 12) + 1 )))-$(printf "%02d" $(( (total_file_count % 28) + 1 )))"
    SUMMARY="This is a summary for $category post $i. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    SLUG="${category}-post-$i"
    COMPLETED="true"

    FRONTMATTER="---
title: \"$TITLE\"
date: \"$DATE\"
tags: [\"tech\", \"coding\", \"$category\"]
summary: \"$SUMMARY\"
slug: \"$SLUG\"
category: \"$category\"
completed: $COMPLETED
---"

    # 파일 내용 조합 및 파일에 쓰기
    echo -e "$FRONTMATTER\n\n$LONG_CONTENT" > "$FILE_PATH"

    # 1000개마다 진행 상황 출력
    if (( total_file_count % 1000 == 0 )); then
      echo "$total_file_count개 파일 생성 완료..."
    fi
  done
  
  echo "[$category] 카테고리 완료: $files_to_create개 파일 생성됨"
done

END_TIME=$(date +%s) # 종료 시간 기록
TOTAL_TIME=$((END_TIME - START_TIME))

echo -e "\n모든 $NUM_FILES개 더미 .md 파일 생성이 완료되었습니다!"
echo "카테고리별 분포:"
for category in "${CATEGORIES[@]}"; do
  file_count=$(find "$TMP_DIR/$category" -name "*.mdx" | wc -l)
  echo "  $category: $file_count개"
done
echo "총 소요 시간: ${TOTAL_TIME}초"
