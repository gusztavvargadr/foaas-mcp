import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, targetPersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const gfyTool = {
  name: 'foaas_gfy',
  description: '⚠️ EXPLICIT CONTENT: Military-style "Golf Foxtrot Yankee" (Go Fuck Yourself). Professional yet profane.',
  inputSchema: z.object({
    name: targetPersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.gfy(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
