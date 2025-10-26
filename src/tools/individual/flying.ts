import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const flyingTool = {
  name: 'foaas_flying',
  description: 'Use for expressing maximum indifference, showing extreme lack of concern, emphasizing you really don\'t care, or dismissing something as completely irrelevant.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.flying(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
