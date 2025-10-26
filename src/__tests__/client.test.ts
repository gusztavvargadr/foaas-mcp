import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FoaasClient } from '../foaas/client.js';

describe('FoaasClient', () => {
  let client: FoaasClient;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    client = new FoaasClient();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('Appreciation & Praise Operations', () => {
    it('should call thanks endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Fuck you very much', subtitle: '- TestBot' })
      });

      const result = await client.thanks('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/thanks/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toBe('Fuck you very much');
      expect(result.subtitle).toBe('- TestBot');
    });

    it('should call awesome endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'This is Fucking Awesome.', subtitle: '- TestBot' })
      });

      const result = await client.awesome('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/awesome/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toBe('This is Fucking Awesome.');
    });

    it('should call legend endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Alice, you\'re a fucking legend.', subtitle: '- TestBot' })
      });

      const result = await client.legend('Alice', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/legend/Alice/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Alice');
    });

    it('should call dalton endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Alice: A fucking problem solving super-hero.', subtitle: '- TestBot' })
      });

      const result = await client.dalton('Alice', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/dalton/Alice/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Alice');
    });
  });

  describe('Rejection Operations', () => {
    it('should call because endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Why? Because fuck you, that\'s why.', subtitle: '- TestBot' })
      });

      const result = await client.because('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/because/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Because');
    });

    it('should call zero endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Zero, that\'s the number of fucks I give.', subtitle: '- TestBot' })
      });

      const result = await client.zero('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/zero/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Zero');
    });

    it('should call bye endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Fuckity bye!', subtitle: '- TestBot' })
      });

      const result = await client.bye('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/bye/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('bye');
    });
  });

  describe('Direct Confrontation Operations', () => {
    it('should call off endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Fuck off, Bob.', subtitle: '- TestBot' })
      });

      const result = await client.off('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/off/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call gfy endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Golf Foxtrot Yankee, Bob.', subtitle: '- TestBot' })
      });

      const result = await client.gfy('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/gfy/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call chainsaw endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Fuck me gently with a chainsaw, Bob.', subtitle: '- TestBot' })
      });

      const result = await client.chainsaw('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/chainsaw/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('chainsaw');
    });

    it('should call keep endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Bob: Fuck off. And when you get there, fuck off from there too.', subtitle: '- TestBot' })
      });

      const result = await client.keep('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/keep/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });
  });

  describe('Frustration Operations', () => {
    it('should call everyone endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Everyone can fuck off.', subtitle: '- TestBot' })
      });

      const result = await client.everyone('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/everyone/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Everyone');
    });

    it('should call flying endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'I don\'t give a flying fuck.', subtitle: '- TestBot' })
      });

      const result = await client.flying('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/flying/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('flying');
    });

    it('should call asshole endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Fuck you, asshole.', subtitle: '- TestBot' })
      });

      const result = await client.asshole('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/asshole/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('asshole');
    });
  });

  describe('Code Review & Quality Operations', () => {
    it('should call logs endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Check the fucking logs!', subtitle: '- TestBot' })
      });

      const result = await client.logs('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/logs/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('logs');
    });

    it('should call rtfm endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Read the fucking manual!', subtitle: '- TestBot' })
      });

      const result = await client.rtfm('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/rtfm/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('manual');
    });

    it('should call think endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'What the fuck were you thinking, Bob?', subtitle: '- TestBot' })
      });

      const result = await client.think('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/think/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call thinking endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'What were you fucking thinking, Bob?', subtitle: '- TestBot' })
      });

      const result = await client.thinking('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/thinking/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call shutup endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Bob, shut the fuck up.', subtitle: '- TestBot' })
      });

      const result = await client.shutup('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/shutup/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call look endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Look at this fucking Bob.', subtitle: '- TestBot' })
      });

      const result = await client.look('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/look/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call ridiculous endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'That\'s fucking ridiculous.', subtitle: '- TestBot' })
      });

      const result = await client.ridiculous('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/ridiculous/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('ridiculous');
    });

    it('should call understand endpoint with name and from', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'I can\'t fucking understand Bob.', subtitle: '- TestBot' })
      });

      const result = await client.understand('Bob', 'TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/understand/Bob/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Bob');
    });

    it('should call cool endpoint correctly', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Cool story, bro.', subtitle: '- TestBot' })
      });

      const result = await client.cool('TestBot');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/cool/TestBot',
        { headers: { Accept: 'application/json' } }
      );
      expect(result.message).toContain('Cool');
    });
  });

  describe('URL Encoding', () => {
    it('should encode special characters in parameters', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Test', subtitle: 'Test' })
      });

      await client.thanks('Test User@123');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/thanks/Test%20User%40123',
        { headers: { Accept: 'application/json' } }
      );
    });

    it('should encode Unicode characters', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Test', subtitle: 'Test' })
      });

      await client.thanks('用户');

      expect(fetchMock).toHaveBeenCalledWith(
        'https://foaas.io/thanks/%E7%94%A8%E6%88%B7',
        { headers: { Accept: 'application/json' } }
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw error on network failure', async () => {
      fetchMock.mockRejectedValue(new Error('Network error'));

      await expect(client.thanks('TestBot')).rejects.toThrow(
        'Failed to fetch from FOAAS: Network error'
      );
    });

    it('should throw error on HTTP 404', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(client.thanks('TestBot')).rejects.toThrow(
        'FOAAS API returned 404: Not Found'
      );
    });

    it('should throw error on HTTP 500', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      await expect(client.thanks('TestBot')).rejects.toThrow(
        'FOAAS API returned 500: Internal Server Error'
      );
    });

    it('should throw error on invalid JSON response', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => { throw new Error('Invalid JSON'); }
      });

      await expect(client.thanks('TestBot')).rejects.toThrow(
        'Failed to fetch from FOAAS'
      );
    });

    it('should handle non-Error objects in catch', async () => {
      fetchMock.mockRejectedValue('string error');

      await expect(client.thanks('TestBot')).rejects.toThrow(
        'Failed to fetch from FOAAS: string error'
      );
    });
  });
});
