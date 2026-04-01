import {Agent} from '@openai/agents';
import {z} from 'zod';
import {WebSearchTool} from '../agent_tools/webSearch.js';
import {ResearchPrompt} from '../constants/researchPrompt.js'

const outputSchema = z.object({
    category: z.string(),
    technical: z.boolean(),
    stage: z.enum(["early","mid","large","unknown"]),
    hiring_signal: z.enum(["yes", "no", "unknown"]),
    confidence: z.number().min(0).max(1),
})

const CompanyResearchAgent = new Agent({
    name:"Company Research Agent",
    instructions: ResearchPrompt,
    tools:[WebSearchTool],
    outputType: outputSchema
});

export default CompanyResearchAgent;