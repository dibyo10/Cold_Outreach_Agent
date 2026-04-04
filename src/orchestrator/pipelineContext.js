/**
 * PipelineContext is the single shared data structure passed through all steps.
 * Steps read from it and write to it. No step imports another step.
 *
 * Shape evolves as the pipeline progresses:
 *   - After DomainStep:   context.domains         string[]
 *   - After FilterStep:   context.newDomains      string[]
 *   - After HunterStep:   context.leads           Lead[]
 *   - After ResearchStep: context.leads[].research CompanyResearch
 *   - After ScoringStep:  context.leads[].score    ScoredLead
 *   - After EmailStep:    context.leads[].email    EmailDraft
 *   - After SendStep:     context.results          SendResult[]
 */

export class PipelineContext {
    constructor(){

        /** @type {string[]} */
        this.domains = [];

        /** @type {string[]} */
        this.newDomains = [];

        /**
         * @type {Array<{
         *   domain: string,
         *   emails: import('./steps/hunterStep.js').HunterEmail[],
         *   research?: import('./steps/researchStep.js').CompanyResearch,
         *   score?: number,
         *   scoreReason?: string,
         *   accepted?: boolean,
         *   emailDraft?: { subject: string, body: string },
         * }>}
         */

        this.leads = [];

        /** @type {Array<{ domain: string, success: boolean, messageId?: string, error?: string }>} */

        this.results = [];



    }
}