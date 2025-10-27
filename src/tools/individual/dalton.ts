import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const daltonTool = {
  name: 'foaas_dalton',
  description: 'Use when praising someone for solving difficult problems, fixing critical issues, being a hero, or handling tough situations brilliantly. Requires a target person.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.dalton(args.to, args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
