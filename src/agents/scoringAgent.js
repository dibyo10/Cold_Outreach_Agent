import {Agent, tool} from '@openai/agents';
import {z} from 'zod';
import {MyResume} from '../constants/myResumeDescription.js'
import {ScoringAgentPrompt} from '../constants/scoringAgentPrompt.js'

const outputSchema = z.object({
    score: z.number(),
    reason: z.string()
})

const ScoringAgent = new Agent({
    name:"Scoring Agent",
    instructions: ScoringAgentPrompt + MyResume,
    outputType : outputSchema
})

export default ScoringAgent;