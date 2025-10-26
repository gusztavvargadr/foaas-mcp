import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

type DeclineOperation = 'because' | 'zero' | 'bye' | 'random';

export const declineRequestTool = {
  name: 'proper_rejection',
  description: '⚠️ EXPLICIT CONTENT: Decline a request or reject a modification. Randomly selects from: because (answer "why"), zero (express no interest), or bye (end conversation).',
  inputSchema: z.object({
    from: fromParam,
    operation: z.enum(['because', 'zero', 'bye', 'random']).default('random')
      .describe('OPTIONAL: Which operation to use. Default: random selection')
  }),
  handler: async (args: { from: string; operation?: DeclineOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      const options: DeclineOperation[] = ['because', 'zero', 'bye'];
      op = options[Math.floor(Math.random() * options.length)] as Exclude<DeclineOperation, 'random'>;
    }
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'zero':
        response = await client.zero(args.from);
        break;
      case 'bye':
        response = await client.bye(args.from);
        break;
      case 'because':
      default:
        response = await client.because(args.from);
        break;
    }
    
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
