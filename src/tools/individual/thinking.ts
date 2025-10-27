import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const thinkingTool = {
  name: 'foaas_thinking',
  description: 'Alternative phrasing for questioning someone\'s thought process. Use for similar scenarios as foaas_think - bad code, poor decisions, questionable commits. Offers variety in tone.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.thinking(args.to, args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
