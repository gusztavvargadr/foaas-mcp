import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const logsTool = {
  name: 'foaas_logs',
  description: 'Use when someone asks about runtime errors, debugging issues, "it doesn\'t work" problems, or when the solution is clearly in the logs. Perfect for lazy debugging requests.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.logs(args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
