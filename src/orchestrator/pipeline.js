import {PipelineContext} from "../pipelineContext.js";

/**
 * Pipeline orchestrates a sequence of Steps.
 *
 * It is intentionally dumb:
 *   - It does not know what any step does
 *   - It does not import agents, queues, or services
 *   - Steps are injected at construction time (Open/Closed, Dependency Inversion)
 *
 * To add a step: instantiate it and pass it in the array.
 * To remove a step: remove it from the array.
 * Neither change touches this file.
 *
 * @example
 * const pipeline = new Pipeline([
 *   new DomainStep(),
 *   new FilterStep(),
 *   new HunterStep(),
 *   new ResearchStep(),
 *   new ScoringStep(),
 *   new EmailStep(),
 *   new SendStep(),
 * ]);
 * await pipeline.run();
 */

export class Pipeline {
    /**
     * @param {import('./steps/step.js').Step[]} steps
     */
    constructor(steps){
        this.steps = steps;
    }
    /**
     * Runs all steps sequentially, passing a shared context through each.
     * If a step throws, the pipeline halts and re-throws — no silent failures.
     *
     * @returns {Promise<PipelineContext>}
     */
    async run() {
        const context = new PipelineContext();

        for (const step of this.steps) {
            console.log(`\n── Running: ${step.name}`);
            await step.run(context);
        }

        return context;
    }
}