import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const ridiculousTool = {
  name: 'foaas_ridiculous',
  description: 'Use for absurd requirements, impossible deadlines, unrealistic feature requests, or situations that are clearly beyond reasonable. Perfect for scope creep and feature bloat discussions.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.ridiculous(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
