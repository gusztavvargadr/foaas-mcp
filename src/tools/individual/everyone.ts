import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const everyoneTool = {
  name: 'foaas_everyone',
  description: '⚠️ EXPLICIT CONTENT: "Everyone can go and fuck off." Universal dismissal of all parties.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.everyone(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
