import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const offTool = {
  name: 'foaas_off',
  description: 'Use for direct dismissal of someone, telling a person to go away, rejecting someone firmly, or expressing strong disapproval of an individual. Requires a target. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.off(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
