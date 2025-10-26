import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

type AppreciationOperation = 'thanks' | 'awesome' | 'legend' | 'random';

export const expressAppreciationTool = {
  name: 'express_appreciation',
  description: '⚠️ EXPLICIT CONTENT: Express sarcastic or genuine appreciation. Randomly selects from available operations: thanks (sarcastic), awesome (enthusiastic), or legend (praise a person).',
  inputSchema: z.object({
    from: fromParam,
    target: z.string().optional().describe('OPTIONAL: Person to appreciate (required for "legend" operation). Use context: issue author, PR creator, user being thanked, etc.'),
    operation: z.enum(['thanks', 'awesome', 'legend', 'random']).default('random')
      .describe('OPTIONAL: Which operation to use. Default: random selection based on parameters')
  }),
  handler: async (args: { target?: string; from: string; operation?: AppreciationOperation }, client: FoaasClient): Promise<CallToolResult> => {
    let op = args.operation || 'random';
    
    // Handle randomization
    if (op === 'random') {
      if (args.target) {
        // If target provided, can use legend
        const options: AppreciationOperation[] = ['thanks', 'awesome', 'legend'];
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
