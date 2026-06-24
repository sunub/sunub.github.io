# System Context & Glossary

## Glossary

*   **FrontMatter Indexing**: The process in `BlogService` that lazily reads markdown files (`.md`, `.mdx`) from the filesystem, extracts their YAML frontmatter, and builds a serialized NDJSON index file (`posts.jsonl`).
*   **Lazy Evaluation (지연 평가)**: Using Iterable and AsyncGenerator protocols (e.g., `getFileNames()`) to process data items one-by-one as requested, avoiding pre-allocation of the entire dataset into memory.
*   **Async Side Effect Control (비동기 사이드 이펙트 제어)**: `Promise.all`과 같은 Eager Evaluation 방식으로 인해 대량의 비동기 작업(File I/O 등)이 한 번에 콜백 큐에 쏟아져 들어와 **이벤트 루프(Event Loop)가 블로킹되고 TTI(Time To Interactive)가 지연되는 현상**을 막기 위해, Iterable과 `concurrent(maxConcurrency)`를 활용하여 동시에 실행되는 비동기 작업의 수를 엄격하게 제한하는 기법.
