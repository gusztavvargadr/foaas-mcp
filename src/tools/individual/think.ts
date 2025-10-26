import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const thinkTool = {
  name: 'foaas_think',
  description: 'Use for questionable code, bad decisions in PRs, WTF commits, poor architectural choices, or when reviewing something that makes you wonder about the author\'s thought process.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.think(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
