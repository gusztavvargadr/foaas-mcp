import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const thanksTool = {
  name: 'foaas_thanks',
  description: '⚠️ EXPLICIT CONTENT: Sarcastic "fuck you very much" response. Use for ironic gratitude or sarcastic thanks.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.thanks(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
