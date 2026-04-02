import { Worker } from "bullmq";
import IORedis from "ioredis";
import FinHunterEmails from "../services/hunterService.js";
import {emailQueue} from "../queue/emailQueue.js";

const connection = new IORedis();

new Worker(
    "hunterQueue",
    async (job) => {
        const { domain, apiKey } = job.data;

        const emails = await FinHunterEmails(domain, apiKey);

        if(!emails.length) return;

        await emailQueue.add("processEmail",{
            domain,
            emails,
        });
    },
    {
        connection,
        limiter: { 
            max: 5,
            duration: 1000,
        },
    }
);