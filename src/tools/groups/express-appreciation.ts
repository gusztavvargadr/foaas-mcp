import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, praisePersonParam, formatFoaasResponse } from '../shared/schemas.js';

type AppreciationOperation = 'thanks' | 'awesome' | 'legend' | 'dalton' | 'random';

export const expressAppreciationTool = {
  name: 'proper_appreciation',
  description: '⚠️ EXPLICIT CONTENT: Express sarcastic or genuine appreciation. Randomly selects from available operations: thanks (sarcastic), awesome (enthusiastic), legend (praise), or dalton (problem-solving hero).',
  inputSchema: z.object({
    target: praisePersonParam.optional().describe('OPTIONAL: Person to appreciate (required for "legend" and "dalton" operations). Use context: issue author, PR creator, user being thanked, etc.'),
    from: fromParam,
    operation: z.enum(['thanks', 'awesome', 'legend', 'dalton', 'random']).default('random')
      .describe('OPTIONAL: Which operation to use. Default: random selection based on parameters')
  }),
  handler: async (args: { target?: string; from: string; operation?: AppreciationOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      if (args.target) {
        // If target provided, can use legend or dalton
        const options: AppreciationOperation[] = ['thanks', 'awesome', 'legend', 'dalton'];
        op = options[Math.floor(Math.random() * options.length)] as Exclude<AppreciationOperation, 'random'>;
      } else {
        // No target, only thanks or awesome
        op = Math.random() < 0.5 ? 'thanks' : 'awesome';
      }
    }
    
    // Call appropriate operation
    let response;
    switch (op) {
      case 'legend':
        if (!args.target) {
          throw new Error('Target is required for "legend" operation');
        }
        response = await client.legend(args.target, args.from);
        break;
      case 'dalton':
        if (!args.target) {
          throw new Error('Target is required for "dalton" operation');
        }
        response = await client.dalton(args.target, args.from);
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
