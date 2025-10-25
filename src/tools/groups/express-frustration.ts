import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

type FrustrationOperation = 'everyone' | 'flying' | 'asshole' | 'random';

export const expressFrustrationTool = {
  name: 'express_frustration',
  description: '⚠️ EXPLICIT CONTENT: Express universal frustration or broad dismissal. Randomly selects from: everyone (dismiss all), flying (don\'t care), or asshole (general insult).',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who is expressing frustration. Use "Copilot" when called by AI, otherwise use the current user\'s name.'),
    operation: z.enum(['everyone', 'flying', 'asshole', 'random']).default('random')
      .describe('Which operation to use. Default: random selection')
  }),
  handler: async (args: { from: string; operation?: FrustrationOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      const options: FrustrationOperation[] = ['everyone', 'flying', 'asshole'];
      op = options[Math.floor(Math.random() * options.length)] as Exclude<FrustrationOperation, 'random'>;
    }
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'flying':
        response = await client.flying(args.from);
        break;
      case 'asshole':
        response = await client.asshole(args.from);
        break;
      case 'everyone':
      default:
        response = await client.everyone(args.from);
        break;
    }
    
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
