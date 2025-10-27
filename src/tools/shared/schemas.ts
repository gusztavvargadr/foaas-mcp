import { z } from 'zod';

/**
 * Common parameter schemas used across multiple tools
 */

/**
 * Default value for the "from" parameter when not provided
 * Also used as User-Agent for HTTP requests to identify the client
 */
export const DEFAULT_FROM = 'gusztavvargadr/foaas-mcp';

/**
 * The "from" parameter - who is sending/performing the action.
 * Used in almost all FOAAS operations.
 *
 * This parameter only affects the subtitle in the FOAAS API response,
 * which we don't return (we only return the message content).
 * Therefore, this parameter does not affect the actual response content.
 * 
 * If not provided, defaults to "gusztavvargadr/foaas-mcp".
 * 
 * Examples:
 *   - { from: "Alice" }
 *   - { from: "Bob" }
 *   - Omitted (uses "gusztavvargadr/foaas-mcp")
 */
export const fromParam = z.string().optional().describe(
  'Who is performing this action. This does not affect response content. Defaults to "gusztavvargadr/foaas-mcp" if not provided.'
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
 * 
 * Note: We only return the message, not the subtitle (which is just "- {from}").
 * The attribution is already clear from the MCP tool invocation context,
 * and including it can confuse AI agents into thinking they need to add
 * that text when using the tool.
 */
export function formatFoaasResponse(message: string, subtitle: string) {
  return {
    content: [
      { type: 'text' as const, text: message }
    ]
  };
}
