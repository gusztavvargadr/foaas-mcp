import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const coolTool = {
  name: 'foaas_cool',
  description: 'Use for sarcastic approval, dismissing excuses, responding to lengthy explanations that don\'t matter, or when someone is making excuses for failures. Peak sarcasm energy.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.cool(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
