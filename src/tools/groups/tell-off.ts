import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, targetPersonParam, formatFoaasResponse } from '../shared/schemas.js';

type ConfrontationOperation = 'off' | 'gfy' | 'chainsaw' | 'dalton' | 'keep' | 'random';

export const tellOffTool = {
  name: 'tell_off',
  description: '⚠️ EXPLICIT CONTENT: Direct confrontation with a specific target. Randomly selects from: off (classic), gfy (military), chainsaw (Heathers), dalton (hero), or keep (extended dismissal).',
  inputSchema: z.object({
    target: targetPersonParam,
    from: fromParam,
    operation: z.enum(['off', 'gfy', 'chainsaw', 'dalton', 'keep', 'random']).default('random')
      .describe('Which operation to use. Default: random selection')
  }),
  handler: async (args: { target: string; from: string; operation?: ConfrontationOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      const options: ConfrontationOperation[] = ['off', 'gfy', 'chainsaw', 'dalton', 'keep'];
      op = options[Math.floor(Math.random() * options.length)] as Exclude<ConfrontationOperation, 'random'>;
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
      case 'dalton':
        response = await client.dalton(args.target, args.from);
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
