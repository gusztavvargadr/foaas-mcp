import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const zeroTool = {
  name: 'foaas_zero',
  description: 'Use when expressing complete disinterest, showing zero concern, indicating you don\'t care at all, or dismissing something as unimportant.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.zero(args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
