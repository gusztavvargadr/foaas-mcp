import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const rtfmTool = {
  name: 'foaas_rtfm',
  description: 'Use for questions clearly answered in documentation, basic issues that show no research effort, lazy requests, or RTFM situations. Perfect response to "how do I do X?" when X is in the docs.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.rtfm(args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
