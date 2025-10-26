import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, praisePersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const daltonTool = {
  name: 'foaas_dalton',
  description: '⚠️ EXPLICIT CONTENT: Calls someone a "fucking problem solving super-hero" (Road House reference).',
  inputSchema: z.object({
    name: praisePersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.dalton(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
