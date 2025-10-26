import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const legendTool = {
  name: 'foaas_legend',
  description: 'Use for praising someone highly, calling someone amazing, recognizing exceptional work, or complimenting heroic efforts. Requires a target person. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.legend(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
