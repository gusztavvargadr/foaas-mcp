import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const chainsawTool = {
  name: 'foaas_chainsaw',
  description: 'Use for expressing sarcastic disbelief, showing exaggerated shock at someone, reacting to absurdity, or using pop culture references. Requires a target.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.chainsaw(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
