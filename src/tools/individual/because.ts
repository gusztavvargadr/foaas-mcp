import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const becauseTool = {
  name: 'foaas_because',
  description: 'Use when answering "why" questions dismissively, refusing to explain, rejecting requests emphatically, or shutting down interrogations. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.because(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
