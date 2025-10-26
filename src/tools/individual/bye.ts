import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const byeTool = {
  name: 'foaas_bye',
  description: 'Use for ending conversations emphatically, saying goodbye dismissively, terminating discussions, or leaving a situation dramatically.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.bye(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
