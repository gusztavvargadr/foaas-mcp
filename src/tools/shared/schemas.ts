import { z } from 'zod';

/**
 * Common parameter schemas used across multiple tools
 */

/**
 * The "from" parameter - who is sending/performing the action.
 * Used in almost all FOAAS operations.
 *
 * This should be the name or identifier of the person making the request.
 * 
 * Examples:
 *   - { from: "Alice" }
 *   - { from: "Bob" }
 *   - { from: "the developer" }
 */
export const fromParam = z.string().describe(
  'REQUIRED: Who is performing this action. Use the name of the person making the request.'
);

/**
 * The "to" parameter - who is receiving/targeted by the action.
 * Used in operations that direct a message at someone/something.
 *
 * Usage:
 *   - For praise: Person who deserves recognition (contributor, bug fixer, etc.)
 *   - For dismissal: Person/thing to dismiss (requester, issue, bug, etc.)
 *   - For confrontation: Person to tell off
 *   - For disbelief: Person causing disbelief
 *
 * Examples:
 *   - { to: "John" } - Direct at a person
 *   - { to: "that bug" } - Direct at a thing
 *   - { to: "PR author" } - Direct at a role
 *
 * This unified parameter makes the from/to relationship clear and consistent.
 */
export const toParam = z.string().describe(
  'REQUIRED: Who/what to direct this at. Use context: person name, issue author, PR creator, bug, annoying request, etc.'
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
