# System Context & Glossary

## Glossary

*   **FrontMatter Indexing**: The process in `BlogService` that reads only the metadata needed to index a post, excluding the post body, and builds a serialized NDJSON index file (`posts.jsonl`).
*   **Memory-Safe Lazy Indexing Path**: The blog post indexing and query path that reduces large-scale source file reads to metadata-only work, evaluates work lazily, and caps concurrent file work to stay within memory limits while handling large post sets.
*   **Post Index**: The normalized metadata set persisted from source posts so that query paths can read index data instead of rescanning original markdown files on every request.
*   **Full Content Read**: The detailed post read path that loads the entire post body because rendering a single post requires complete content, not just index metadata.
*   **Lazy Evaluation (지연 평가)**: Using Iterable and AsyncGenerator protocols (e.g., `getFileNames()`) to process data items one-by-one as requested, avoiding pre-allocation of the entire dataset into memory.
*   **Async Side Effect Control (비동기 사이드 이펙트 제어)**: The primary stability mechanism for large post workloads. It caps concurrent file I/O and parsing work so the system avoids runaway async pressure from eager fan-out patterns such as `Promise.all`.
*   **Layered Concurrency Control**: Separate concurrency guards for batch indexing work and full-content read work, because the two paths protect different workloads and failure modes even though both limit parallel file processing.
*   **Execution Model**: The reusable iterable-based model provided by `packages/utils` that makes lazy evaluation and bounded concurrency composable in blog indexing and query paths.
*   **Content Experience Stability (콘텐츠 경험 안정성)**: Confidence that frequent post, navigation, search, and presentation changes preserve the blog's core reading and discovery experience. _Avoid_: using "deployment stability" when the discussion is about change-time regressions rather than production traffic incidents.
