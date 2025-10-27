import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const understandTool = {
  name: 'foaas_understand',
  description: 'Use when requirements are unclear, code is confusing, documentation is missing, or someone\'s explanation makes no sense. Expresses genuine confusion about what someone is trying to communicate.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.understand(args.to, args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
