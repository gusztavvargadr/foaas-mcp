import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

type TellOffOperation = 'off' | 'gfy' | 'chainsaw' | 'keep';

export const tellOffTool = {
  name: 'proper_confrontation',
  description: 'Use when telling someone off, confronting a person directly, dismissing someone specific, expressing anger at an individual, or dealing with persistent annoyances. Requires a target. ⚠️ EXPLICIT CONTENT - Randomly selects from: off (classic), gfy (military), chainsaw (Heathers), or keep (extended dismissal).',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    // Pick a random operation
    const options: TellOffOperation[] = ['off', 'gfy', 'chainsaw', 'keep'];
    const op = options[Math.floor(Math.random() * options.length)];
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'gfy':
        response = await client.gfy(args.to, args.from);
        break;
      case 'chainsaw':
        response = await client.chainsaw(args.to, args.from);
        break;
      case 'keep':
        response = await client.keep(args.to, args.from);
        break;
      case 'off':
      default:
        response = await client.off(args.to, args.from);
        break;
    }
    
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
