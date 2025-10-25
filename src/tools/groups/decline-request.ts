import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

type RejectionOperation = 'because' | 'zero' | 'bye' | 'random';

export const declineRequestTool = {
  name: 'decline_request',
  description: '⚠️ EXPLICIT CONTENT: Decline a request or reject a modification. Randomly selects from: because (answer "why"), zero (express no interest), or bye (end conversation).',
  inputSchema: z.object({
    from: z.string().describe('Who is declining the request'),
    operation: z.enum(['because', 'zero', 'bye', 'random']).default('random')
      .describe('Which operation to use. Default: random selection')
  }),
  handler: async (args: { from: string; operation?: RejectionOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      const options: RejectionOperation[] = ['because', 'zero', 'bye'];
      op = options[Math.floor(Math.random() * options.length)] as Exclude<RejectionOperation, 'random'>;
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
    
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
