import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const awesomeTool = {
  name: 'foaas_awesome',
  description: 'Use for enthusiastic celebration, expressing excitement, praising success, or showing genuine enthusiasm about something great. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.awesome(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
