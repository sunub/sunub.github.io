"use server";
import { readFileProcess } from "../workers/worker.js";
import { parentPort, workerData } from "worker_threads";
readFileProcess()
  .then(() => {
    parentPort?.postMessage({ type: "done", content: workerData.tag });
  })
  .catch((error) => {
    parentPort?.postMessage({
      type: "error",
      content: error.message,
    });
  });
//# sourceMappingURL=algorithm.worker.js.map
