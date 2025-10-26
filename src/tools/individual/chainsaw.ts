import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, disbeliefPersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const chainsawTool = {
  name: 'foaas_chainsaw',
  description: '⚠️ EXPLICIT CONTENT: "Fuck me gently with a chainsaw, {name}!" (Heathers reference). Sarcastic disbelief directed at someone.',
  inputSchema: z.object({
    name: disbeliefPersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.chainsaw(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
