import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, targetPersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const offTool = {
  name: 'foaas_off',
  description: '⚠️ EXPLICIT CONTENT: Classic "Fuck off" directed at someone. Direct and unambiguous dismissal.',
  inputSchema: z.object({
    name: targetPersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.off(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
