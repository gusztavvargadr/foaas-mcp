import type { FoaasResponse } from './types.js';

export class FoaasClient {
  private baseUrl = 'https://foaas.io';

  private async fetch(path: string): Promise<FoaasResponse> {
    const url = `${this.baseUrl}${path}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`FOAAS API returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as FoaasResponse;
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch from FOAAS: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Appreciation & Praise
  async thanks(from: string): Promise<FoaasResponse> {
    return this.fetch(`/thanks/${encodeURIComponent(from)}`);
  }

  async awesome(from: string): Promise<FoaasResponse> {
    return this.fetch(`/awesome/${encodeURIComponent(from)}`);
  }

  async legend(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/legend/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  async dalton(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/dalton/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  // Rejections
  async because(from: string): Promise<FoaasResponse> {
    return this.fetch(`/because/${encodeURIComponent(from)}`);
  }

  async zero(from: string): Promise<FoaasResponse> {
    return this.fetch(`/zero/${encodeURIComponent(from)}`);
  }

  async bye(from: string): Promise<FoaasResponse> {
    return this.fetch(`/bye/${encodeURIComponent(from)}`);
  }

  // Direct Confrontations
  async off(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/off/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  async gfy(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/gfy/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  async chainsaw(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/chainsaw/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  async keep(name: string, from: string): Promise<FoaasResponse> {
    return this.fetch(`/keep/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
  }

  // Frustration
  async everyone(from: string): Promise<FoaasResponse> {
    return this.fetch(`/everyone/${encodeURIComponent(from)}`);
  }

  async flying(from: string): Promise<FoaasResponse> {
    return this.fetch(`/flying/${encodeURIComponent(from)}`);
  }

  async asshole(from: string): Promise<FoaasResponse> {
    return this.fetch(`/asshole/${encodeURIComponent(from)}`);
  }
}
