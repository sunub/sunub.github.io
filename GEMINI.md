# Full Updated Guidelines

## Type Management

Mandatory Review: All types used in this project are defined in ./packages/types/. You must review these files before writing any code.

Type Declaration: When a new type is required, refer to the existing patterns in ./packages/types/. If existing types cannot resolve the requirement, you must define and export the new type within ./packages/types/.

## Contracts and URL Conventions

Mandatory Review: All global rules, such as URL structures and technical contracts, are defined in ./packages/contracts/. You must verify these definitions before implementation.

Contract Definition: When adding new URLs or contracts, follow the established conventions in ./packages/contracts/. If the current contracts are insufficient, you must create and document the new contract within that directory.

## Architecture Protocol

FSD Architecture: This project strictly adheres to Feature-Sliced Design (FSD). It is mandatory to have a comprehensive understanding of FSD principles and the directory hierarchy before contributing to the codebase.

## Execution and Approval Protocol

Mandatory Discussion: If a prompt includes a command to discuss an approach (e.g., "tell me") prior to execution, you must not proceed with code modifications immediately.

Approval Workflow: You must first explain the proposed solution or changes. Code modifications may only be executed after receiving explicit acceptance.

## Commit Message Format

Standardized Conventions: When writing commit messages, you must follow conventional commit standards. Explicitly declare the type of change (e.g., feat, refactor, fix, docs, style, test, chore) and use parentheses to briefly identify the scope of the affected task or component.

Detailed Descriptions: Commit messages must include a concise summary of the changes, followed by a detailed, bulleted list explaining the specific modifications, as demonstrated in the format below:

```plaintext
refactor(scroll) : 가상 스크롤 range 계산과 preload 제어를 안정화

- mixed-height 환경에서 item 등록 시 초기 높이를 즉시 pending 측정값에 반영하도록 변경
- ResizeObserver 초기 콜백 이전에도 실제 높이가 range 계산에 반영되도록 보강
- visible window 계산에 trailing overscan을 포함해 viewport 끝 아이템 누락 가능성을 줄임
- loadMore cooldown sentinel을 null 기반으로 바꿔 performance.now()가 0인 경우에도 중복 호출이 나지 않도록 수정
```
