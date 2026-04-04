import {run} from '@openai/agents';
import {Step} from "./step.js";
import DomainFinderAgent from "../../domainAgent.js";

/**
 * Runs the DomainFinderAgent to discover relevant startup domains.
 * Writes: context.domains
 */

export class DomainStep extends Step {
    constructor(){
        super("DomainStep");
    }

    async run(context){
        console.log(`[${this.name}] Discovering domains...`);

        const result = await run(DomainFinderAgent, "Find relevant startup domains for outreach according to my Resume.");
        context.domains = result.finalOutput.domains;

        console.log(`[${this.name}] Found ${context.domains.length} domains.`);
        return context;
        
    }
}