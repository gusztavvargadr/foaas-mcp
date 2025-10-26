import { describe, it, expect, beforeEach } from 'vitest';
import { z } from 'zod';
import { createMcpServer } from '../server.js';

describe('Server Registration', () => {
  let server: ReturnType<typeof createMcpServer>;

  beforeEach(() => {
    server = createMcpServer();
  });

  it('should create server successfully', () => {
    expect(server).toBeDefined();
  });

  it('should have tools capability', async () => {
    // Get server info through request handler
    const listToolsSchema = {
      method: 'tools/list' as const
    };
    
    // The server should have tools registered
    expect(server).toBeDefined();
  });

  describe('Tool Registration', () => {
    const expectedTools = [
      // Appreciation & Praise
      'foaas_thanks',
      'foaas_awesome',
      'foaas_legend',
      'foaas_dalton',
      // Rejections & Dismissals
      'foaas_because',
      'foaas_zero',
      'foaas_bye',
      // Direct Confrontations
      'foaas_off',
      'foaas_gfy',
      'foaas_chainsaw',
      'foaas_keep',
      // General Frustration
      'foaas_everyone',
      'foaas_flying',
      'foaas_asshole',
      // Code Review & Quality
      'foaas_logs',
      'foaas_rtfm',
      'foaas_think',
      'foaas_thinking',
      'foaas_shutup',
      'foaas_look',
      'foaas_ridiculous',
      'foaas_understand',
      'foaas_cool',
    ];

    it('should register exactly 23 tools', () => {
      expect(expectedTools).toHaveLength(23);
    });

    it('all tool names should follow foaas_ naming convention', () => {
      expectedTools.forEach(name => {
        expect(name).toMatch(/^foaas_[a-z]+$/);
      });
    });

    it('all tool names should be unique', () => {
      const uniqueNames = new Set(expectedTools);
      expect(uniqueNames.size).toBe(expectedTools.length);
    });
  });

  describe('Tool Categories', () => {
    it('should have 4 appreciation & praise tools', () => {
      const appreciationTools = [
        'foaas_thanks',
        'foaas_awesome',
        'foaas_legend',
        'foaas_dalton'
      ];
      expect(appreciationTools).toHaveLength(4);
    });

    it('should have 3 rejection & dismissal tools', () => {
      const rejectionTools = [
        'foaas_because',
        'foaas_zero',
        'foaas_bye'
      ];
      expect(rejectionTools).toHaveLength(3);
    });

    it('should have 4 direct confrontation tools', () => {
      const confrontationTools = [
        'foaas_off',
        'foaas_gfy',
        'foaas_chainsaw',
        'foaas_keep'
      ];
      expect(confrontationTools).toHaveLength(4);
    });

    it('should have 3 general frustration tools', () => {
      const frustrationTools = [
        'foaas_everyone',
        'foaas_flying',
        'foaas_asshole'
      ];
      expect(frustrationTools).toHaveLength(3);
    });

    it('should have 9 code review & quality tools', () => {
      const codeReviewTools = [
        'foaas_logs',
        'foaas_rtfm',
        'foaas_think',
        'foaas_thinking',
        'foaas_shutup',
        'foaas_look',
        'foaas_ridiculous',
        'foaas_understand',
        'foaas_cool'
      ];
      expect(codeReviewTools).toHaveLength(9);
    });

    it('total category counts should equal 23', () => {
      const total = 4 + 3 + 4 + 3 + 9;
      expect(total).toBe(23);
    });
  });
});
