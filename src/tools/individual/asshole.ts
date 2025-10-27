import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const assholeTool = {
  name: 'foaas_asshole',
  description: 'Use for general insults, self-deprecation, expressing anger broadly, or making a non-specific negative statement. No target needed.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.asshole(args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
