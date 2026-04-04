import {Agent} from '@openai/agents';
import {z} from 'zod'
import {WebSearchTool} from '../agent_tools/webSearch.js'
import {DomainFinderPrompt} from '../constants/domainFinderPrompt.js'
import {MyResume} from '../constants/myResumeDescription.js'

const getResultSchema = z.object({
    domains: z.array(z.string())
})

const DomainFinderAgent = new Agent({
    name:"Domain Finder Agent",
    instructions: DomainFinderPrompt + MyResume,
    tools:[WebSearchTool],
    outputType: getResultSchema
})

export default DomainFinderAgent