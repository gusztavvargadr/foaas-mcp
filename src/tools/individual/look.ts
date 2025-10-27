import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const lookTool = {
  name: 'foaas_look',
  description: 'Use when requesting code review, pointing out issues in someone\'s work, drawing attention to problems, or asking someone to examine something specific. More direct than a polite review request.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.look(args.to, args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
