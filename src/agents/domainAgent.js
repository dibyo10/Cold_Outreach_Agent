import {Agent , run , tool} from '@openai/agents';
import {z} from 'zod'
import OpenAI from "openai"


const client = new OpenAI()


const webSearchTool = tool({
    name:"web_search_tool",
    description:"This tool can be used to search the web",
    parameters: z.object({
        searchQuery: z.string().describe("The search query to search the web"),
    }),
    execute: async function ({searchQuery}){

        const response = await client.responses.create({
            model: "gpt-5",
            tools: [
                { type: "web_search" },
            ],
            input: searchQuery,
        });

        return response.output_text;

    }
})

const getResultSchema = z.object({
    domains: z.array(z.string())
})

const DomainFinderAgent = new Agent({
    name:"Domain Finder Agent",
    instructions:"You find relevant companies that I can reach out to using the webSearch tool , according to my resume for an internship , here is my resume- ",
    tools:[webSearchTool],
    outputType: getResultSchema
})

export default DomainFinderAgent