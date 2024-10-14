import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Set up a worker instance with the defined request handlers
export const worker = setupWorker(...handlers);
