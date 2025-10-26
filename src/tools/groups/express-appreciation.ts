import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

type AppreciationOperation = 'thanks' | 'awesome' | 'legend' | 'dalton';

export const expressAppreciationTool = {
  name: 'proper_appreciation',
  description: 'Use when thanking someone, celebrating wins, praising contributors, acknowledging help, showing appreciation, or recognizing achievements. Can be sarcastic or genuine. ⚠️ EXPLICIT CONTENT - Randomly selects from: thanks (sarcastic), awesome (enthusiastic), legend (praise), or dalton (problem-solving hero).',
  inputSchema: z.object({
    to: toParam.optional().describe('OPTIONAL: Person to appreciate (used for "legend" and "dalton" operations). Use context: issue author, PR creator, user being thanked, etc.'),
    from: fromParam
  }),
  handler: async (args: { to?: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    // Pick a random operation
    let op: AppreciationOperation;
    if (args.to) {
      // If target provided, can use legend or dalton
      const options: AppreciationOperation[] = ['thanks', 'awesome', 'legend', 'dalton'];
      op = options[Math.floor(Math.random() * options.length)]!;
    } else {
      // No target, only thanks or awesome
      op = Math.random() < 0.5 ? 'thanks' : 'awesome';
    }
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'legend':
        response = await client.legend(args.to!, args.from);
        break;
      case 'dalton':
        response = await client.dalton(args.to!, args.from);
        break;
      case 'awesome':
        response = await client.awesome(args.from);
        break;
      case 'thanks':
      default:
        response = await client.thanks(args.from);
        break;
    }
    
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
