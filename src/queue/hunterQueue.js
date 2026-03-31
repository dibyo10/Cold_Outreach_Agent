import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

export const hunterQueue = new Queue("hunterQueue", {
    connection,
});