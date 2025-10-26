import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const assholeTool = {
  name: 'foaas_asshole',
  description: '⚠️ EXPLICIT CONTENT: "Fuck you, asshole." General purpose insult or self-deprecation.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.asshole(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
