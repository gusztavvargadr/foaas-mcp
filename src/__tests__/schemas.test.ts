import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { fromParam, toParam, formatFoaasResponse } from '../tools/shared/schemas.js';

describe('Shared Schemas', () => {
  describe('fromParam', () => {
    it('should be a Zod string schema', () => {
      expect(fromParam).toBeInstanceOf(z.ZodString);
    });

    it('should validate valid strings', () => {
      expect(() => fromParam.parse('Alice')).not.toThrow();
      expect(() => fromParam.parse('Bob')).not.toThrow();
      expect(() => fromParam.parse('TestBot')).not.toThrow();
    });

    it('should accept empty strings', () => {
      expect(() => fromParam.parse('')).not.toThrow();
    });

    it('should accept special characters', () => {
      expect(() => fromParam.parse('User@123')).not.toThrow();
      expect(() => fromParam.parse('test-user_123')).not.toThrow();
    });

    it('should accept Unicode characters', () => {
      expect(() => fromParam.parse('用户')).not.toThrow();
      expect(() => fromParam.parse('👤')).not.toThrow();
    });

    it('should reject non-strings', () => {
      expect(() => fromParam.parse(123)).toThrow();
      expect(() => fromParam.parse(null)).toThrow();
      expect(() => fromParam.parse(undefined)).toThrow();
      expect(() => fromParam.parse({})).toThrow();
      expect(() => fromParam.parse([])).toThrow();
    });

    it('should have a description', () => {
      expect(fromParam.description).toBeDefined();
      expect(fromParam.description).toContain('performing');
    });
  });

  describe('toParam', () => {
    it('should be a Zod string schema', () => {
      expect(toParam).toBeInstanceOf(z.ZodString);
    });

    it('should validate valid strings', () => {
      expect(() => toParam.parse('Alice')).not.toThrow();
      expect(() => toParam.parse('bug-123')).not.toThrow();
      expect(() => toParam.parse('PR reviewer')).not.toThrow();
    });

    it('should accept empty strings', () => {
      expect(() => toParam.parse('')).not.toThrow();
    });

    it('should accept special characters', () => {
      expect(() => toParam.parse('Issue #42')).not.toThrow();
      expect(() => toParam.parse('feature/new-api')).not.toThrow();
    });

    it('should accept Unicode characters', () => {
      expect(() => toParam.parse('开发者')).not.toThrow();
      expect(() => toParam.parse('🐛')).not.toThrow();
    });

    it('should reject non-strings', () => {
      expect(() => toParam.parse(123)).toThrow();
      expect(() => toParam.parse(null)).toThrow();
      expect(() => toParam.parse(undefined)).toThrow();
      expect(() => toParam.parse({})).toThrow();
      expect(() => toParam.parse([])).toThrow();
    });

    it('should have a description', () => {
      expect(toParam.description).toBeDefined();
      expect(toParam.description).toContain('direct');
    });
  });

  describe('formatFoaasResponse', () => {
    it('should return a CallToolResult with correct structure', () => {
      const result = formatFoaasResponse('Test message', 'Test subtitle');

      expect(result).toHaveProperty('content');
      expect(Array.isArray(result.content)).toBe(true);
      expect(result.content).toHaveLength(2);
    });

    it('should format message as first text content', () => {
      const result = formatFoaasResponse('Test message', 'Test subtitle');

      expect(result.content[0]).toEqual({
        type: 'text',
        text: 'Test message'
      });
    });

    it('should format subtitle as second text content', () => {
      const result = formatFoaasResponse('Test message', 'Test subtitle');

      expect(result.content[1]).toEqual({
        type: 'text',
        text: 'Test subtitle'
      });
    });

    it('should handle explicit language in message', () => {
      const result = formatFoaasResponse(
        'Fuck you very much',
        '- TestBot'
      );

      expect(result.content[0]?.text).toBe('Fuck you very much');
      expect(result.content[1]?.text).toBe('- TestBot');
    });

    it('should handle empty strings', () => {
      const result = formatFoaasResponse('', '');

      expect(result.content[0]?.text).toBe('');
      expect(result.content[1]?.text).toBe('');
    });

    it('should handle special characters', () => {
      const result = formatFoaasResponse(
        'Message with <>&"\'',
        'Subtitle with @#$%'
      );

      expect(result.content[0]?.text).toBe('Message with <>&"\'');
      expect(result.content[1]?.text).toBe('Subtitle with @#$%');
    });

    it('should handle Unicode characters', () => {
      const result = formatFoaasResponse(
        '消息 🚀',
        '副标题 ✨'
      );

      expect(result.content[0]?.text).toBe('消息 🚀');
      expect(result.content[1]?.text).toBe('副标题 ✨');
    });

    it('should handle multiline strings', () => {
      const result = formatFoaasResponse(
        'Line 1\nLine 2\nLine 3',
        'Sub 1\nSub 2'
      );

      expect(result.content[0]?.text).toBe('Line 1\nLine 2\nLine 3');
      expect(result.content[1]?.text).toBe('Sub 1\nSub 2');
    });
  });
});
