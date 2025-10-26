import { z } from 'zod';

/**
 * Common parameter schemas used across multiple tools
 */

/**
 * The "from" parameter - who is sending/performing the action
 * Used in almost all FOAAS operations
 */
export const fromParam = z.string().describe(
  'REQUIRED: Who is performing this action. Use "AI assistant" when called by an AI agent, otherwise use the current user\'s name.'
);

/**
 * Target/name parameter variations for person-directed operations
 */
export const targetPersonParam = z.string().describe(
  'REQUIRED: Who/what to target. Use context: issue author, PR creator, person making request, annoying bug, etc.'
);

export const praisePersonParam = z.string().describe(
  'REQUIRED: Person to praise. Use context: issue author, PR creator, helpful contributor, person who fixed the bug, etc.'
);

export const dismissPersonParam = z.string().describe(
  'REQUIRED: What/who to dismiss. Use context: persistent requester, annoying issue, person causing problems, etc.'
);

export const disbeliefPersonParam = z.string().describe(
  'REQUIRED: Who to express disbelief at. Use context: person with unbelievable request, shocking issue author, etc.'
);

/**
 * Common response formatter
 * Returns the standard FOAAS response format
 */
export function formatFoaasResponse(message: string, subtitle: string) {
  return {
    content: [
      { type: 'text' as const, text: message },
      { type: 'text' as const, text: subtitle }
    ]
  };
}
