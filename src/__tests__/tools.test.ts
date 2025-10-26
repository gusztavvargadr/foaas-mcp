import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FoaasClient } from '../foaas/client.js';
import { z } from 'zod';

// Import all individual tools
import { assholeTool } from '../tools/individual/asshole.js';
import { awesomeTool } from '../tools/individual/awesome.js';
import { becauseTool } from '../tools/individual/because.js';
import { byeTool } from '../tools/individual/bye.js';
import { chainsawTool } from '../tools/individual/chainsaw.js';
import { coolTool } from '../tools/individual/cool.js';
import { daltonTool } from '../tools/individual/dalton.js';
import { everyoneTool } from '../tools/individual/everyone.js';
import { flyingTool } from '../tools/individual/flying.js';
import { gfyTool } from '../tools/individual/gfy.js';
import { keepTool } from '../tools/individual/keep.js';
import { legendTool } from '../tools/individual/legend.js';
import { logsTool } from '../tools/individual/logs.js';
import { lookTool } from '../tools/individual/look.js';
import { offTool } from '../tools/individual/off.js';
import { ridiculousTool } from '../tools/individual/ridiculous.js';
import { rtfmTool } from '../tools/individual/rtfm.js';
import { shutupTool } from '../tools/individual/shutup.js';
import { thanksTool } from '../tools/individual/thanks.js';
import { thinkTool } from '../tools/individual/think.js';
import { thinkingTool } from '../tools/individual/thinking.js';
import { understandTool } from '../tools/individual/understand.js';
import { zeroTool } from '../tools/individual/zero.js';

describe('Individual Tools', () => {
  let client: FoaasClient;

  beforeEach(() => {
    client = new FoaasClient();
  });

  describe('Tool Structure Validation', () => {
    const toolsWithFromOnly = [
      { tool: assholeTool, name: 'foaas_asshole' },
      { tool: awesomeTool, name: 'foaas_awesome' },
      { tool: becauseTool, name: 'foaas_because' },
      { tool: byeTool, name: 'foaas_bye' },
      { tool: coolTool, name: 'foaas_cool' },
      { tool: everyoneTool, name: 'foaas_everyone' },
      { tool: flyingTool, name: 'foaas_flying' },
      { tool: logsTool, name: 'foaas_logs' },
      { tool: ridiculousTool, name: 'foaas_ridiculous' },
      { tool: rtfmTool, name: 'foaas_rtfm' },
      { tool: thanksTool, name: 'foaas_thanks' },
      { tool: zeroTool, name: 'foaas_zero' }
    ];

    const toolsWithToAndFrom = [
      { tool: chainsawTool, name: 'foaas_chainsaw' },
      { tool: daltonTool, name: 'foaas_dalton' },
      { tool: gfyTool, name: 'foaas_gfy' },
      { tool: keepTool, name: 'foaas_keep' },
      { tool: legendTool, name: 'foaas_legend' },
      { tool: lookTool, name: 'foaas_look' },
      { tool: offTool, name: 'foaas_off' },
      { tool: shutupTool, name: 'foaas_shutup' },
      { tool: thinkTool, name: 'foaas_think' },
      { tool: thinkingTool, name: 'foaas_thinking' },
      { tool: understandTool, name: 'foaas_understand' }
    ];

    toolsWithFromOnly.forEach(({ tool, name }) => {
      describe(name, () => {
        it('should have correct name', () => {
          expect(tool.name).toBe(name);
        });

        it('should have a description', () => {
          expect(tool.description).toBeDefined();
          expect(typeof tool.description).toBe('string');
          expect(tool.description.length).toBeGreaterThan(0);
        });

        it('should have valid inputSchema with only from parameter', () => {
          expect(tool.inputSchema).toBeInstanceOf(z.ZodObject);
          const shape = tool.inputSchema.shape;
          expect(shape).toHaveProperty('from');
          expect(shape).not.toHaveProperty('to');
        });

        it('should have a handler function', () => {
          expect(tool.handler).toBeDefined();
          expect(typeof tool.handler).toBe('function');
        });

        it('should validate input schema correctly', () => {
          const validInput = { from: 'TestBot' };
          expect(() => tool.inputSchema.parse(validInput)).not.toThrow();
        });

        it('should reject missing from parameter', () => {
          expect(() => tool.inputSchema.parse({})).toThrow();
        });
      });
    });

    toolsWithToAndFrom.forEach(({ tool, name }) => {
      describe(name, () => {
        it('should have correct name', () => {
          expect(tool.name).toBe(name);
        });

        it('should have a description', () => {
          expect(tool.description).toBeDefined();
          expect(typeof tool.description).toBe('string');
          expect(tool.description.length).toBeGreaterThan(0);
        });

        it('should have valid inputSchema with to and from parameters', () => {
          expect(tool.inputSchema).toBeInstanceOf(z.ZodObject);
          const shape = tool.inputSchema.shape;
          expect(shape).toHaveProperty('from');
          expect(shape).toHaveProperty('to');
        });

        it('should have a handler function', () => {
          expect(tool.handler).toBeDefined();
          expect(typeof tool.handler).toBe('function');
        });

        it('should validate input schema correctly', () => {
          const validInput = { to: 'Alice', from: 'TestBot' };
          expect(() => tool.inputSchema.parse(validInput)).not.toThrow();
        });

        it('should reject missing from parameter', () => {
          const invalidInput = { to: 'Alice' };
          expect(() => tool.inputSchema.parse(invalidInput)).toThrow();
        });

        it('should reject missing to parameter', () => {
          const invalidInput = { from: 'TestBot' };
          expect(() => tool.inputSchema.parse(invalidInput)).toThrow();
        });
      });
    });

    it('should have exactly 23 tools defined', () => {
      const allTools = [...toolsWithFromOnly, ...toolsWithToAndFrom];
      expect(allTools).toHaveLength(23);
    });

    it('should have all tools with foaas_ prefix', () => {
      const allTools = [...toolsWithFromOnly, ...toolsWithToAndFrom];
      allTools.forEach(({ tool }) => {
        expect(tool.name).toMatch(/^foaas_/);
      });
    });
  });

  describe('Tool Handler Execution', () => {
    it('should call thanksTool handler correctly', async () => {
      const mockClient = {
        thanks: vi.fn().mockResolvedValue({
          message: 'Fuck you very much',
          subtitle: '- TestBot'
        })
      } as unknown as FoaasClient;

      const result = await thanksTool.handler({ from: 'TestBot' }, mockClient);

      expect(mockClient.thanks).toHaveBeenCalledWith('TestBot');
      expect(result.content).toHaveLength(2);
      expect(result.content[0]).toEqual({
        type: 'text',
        text: 'Fuck you very much'
      });
      expect(result.content[1]).toEqual({
        type: 'text',
        text: '- TestBot'
      });
    });

    it('should call legendTool handler correctly', async () => {
      const mockClient = {
        legend: vi.fn().mockResolvedValue({
          message: 'Alice, you\'re a fucking legend.',
          subtitle: '- TestBot'
        })
      } as unknown as FoaasClient;

      const result = await legendTool.handler(
        { to: 'Alice', from: 'TestBot' },
        mockClient
      );

      expect(mockClient.legend).toHaveBeenCalledWith('Alice', 'TestBot');
      expect(result.content).toHaveLength(2);
      expect(result.content[0]?.text).toContain('Alice');
    });

    it('should call offTool handler correctly', async () => {
      const mockClient = {
        off: vi.fn().mockResolvedValue({
          message: 'Fuck off, Bob.',
          subtitle: '- TestBot'
        })
      } as unknown as FoaasClient;

      const result = await offTool.handler(
        { to: 'Bob', from: 'TestBot' },
        mockClient
      );

      expect(mockClient.off).toHaveBeenCalledWith('Bob', 'TestBot');
      expect(result.content).toHaveLength(2);
      expect(result.content[0]?.text).toContain('Bob');
    });

    it('should propagate errors from client', async () => {
      const mockClient = {
        thanks: vi.fn().mockRejectedValue(new Error('Network error'))
      } as unknown as FoaasClient;

      await expect(
        thanksTool.handler({ from: 'TestBot' }, mockClient)
      ).rejects.toThrow('Network error');
    });
  });

  describe('Response Format Consistency', () => {
    it('should return consistent response structure across all tools', async () => {
      const mockResponse = {
        message: 'Test message',
        subtitle: 'Test subtitle'
      };

      type ToolArgs = { from: string } | { to: string; from: string };

      const testTools: Array<{ tool: any; args: ToolArgs; clientMethod: string }> = [
        { tool: thanksTool, args: { from: 'TestBot' }, clientMethod: 'thanks' },
        { tool: legendTool, args: { to: 'Alice', from: 'TestBot' }, clientMethod: 'legend' },
        { tool: offTool, args: { to: 'Bob', from: 'TestBot' }, clientMethod: 'off' }
      ];

      for (const { tool, args, clientMethod } of testTools) {
        const mockClient = {
          [clientMethod]: vi.fn().mockResolvedValue(mockResponse)
        } as unknown as FoaasClient;

        const result = await tool.handler(args, mockClient);

        expect(result).toHaveProperty('content');
        expect(Array.isArray(result.content)).toBe(true);
        expect(result.content).toHaveLength(2);
        expect(result.content[0]).toEqual({
          type: 'text',
          text: 'Test message'
        });
        expect(result.content[1]).toEqual({
          type: 'text',
          text: 'Test subtitle'
        });
      }
    });
  });
});
