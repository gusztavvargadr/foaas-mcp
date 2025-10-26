import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

type FrustrationOperation = 'everyone' | 'flying' | 'asshole';

export const expressFrustrationTool = {
  name: 'proper_frustration',
  description: 'Use when expressing frustration, showing you don\'t care, dismissing everything, venting anger, or making a general complaint. No specific target needed. ⚠️ EXPLICIT CONTENT - Randomly selects from: everyone (dismiss all), flying (don\'t care), or asshole (general insult).',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    // Pick a random operation
    const options: FrustrationOperation[] = ['everyone', 'flying', 'asshole'];
    const op = options[Math.floor(Math.random() * options.length)];
    
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
    
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
