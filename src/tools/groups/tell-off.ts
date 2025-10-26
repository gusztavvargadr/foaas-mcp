import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, dismissPersonParam, formatFoaasResponse } from '../shared/schemas.js';

type TellOffOperation = 'off' | 'gfy' | 'chainsaw' | 'keep' | 'random';

export const tellOffTool = {
  name: 'proper_confrontation',
  description: '⚠️ EXPLICIT CONTENT: Direct confrontation with a specific target. Randomly selects from: off (classic), gfy (military), chainsaw (Heathers), or keep (extended dismissal).',
  inputSchema: z.object({
    target: dismissPersonParam,
    from: fromParam,
    operation: z.enum(['off', 'gfy', 'chainsaw', 'keep', 'random']).default('random')
      .describe('OPTIONAL: Which operation to use. Default: random selection')
  }),
  handler: async (args: { target: string; from: string; operation?: TellOffOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      const options: TellOffOperation[] = ['off', 'gfy', 'chainsaw', 'keep'];
      op = options[Math.floor(Math.random() * options.length)] as Exclude<TellOffOperation, 'random'>;
    }
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'gfy':
        response = await client.gfy(args.target, args.from);
        break;
      case 'chainsaw':
        response = await client.chainsaw(args.target, args.from);
        break;
      case 'keep':
        response = await client.keep(args.target, args.from);
        break;
      case 'off':
      default:
        response = await client.off(args.target, args.from);
        break;
    }
    
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
