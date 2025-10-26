import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const byeTool = {
  name: 'foaas_bye',
  description: '⚠️ EXPLICIT CONTENT: "Fuckity bye-bye!" Use for emphatic goodbyes or ending conversations.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.bye(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
