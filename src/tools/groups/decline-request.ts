import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

type DeclineOperation = 'because' | 'zero' | 'bye';

export const declineRequestTool = {
  name: 'proper_rejection',
  description: 'Use when declining requests, rejecting proposals, refusing changes, saying no, ending discussions, or expressing complete disinterest. ⚠️ EXPLICIT CONTENT - Randomly selects from: because (answer "why"), zero (express no interest), or bye (end conversation).',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    // Pick a random operation
    const options: DeclineOperation[] = ['because', 'zero', 'bye'];
    const op = options[Math.floor(Math.random() * options.length)];
    
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
