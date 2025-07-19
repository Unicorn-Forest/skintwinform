import { describe, it, expect } from 'vitest';
import { PromptLibrary } from '../prompt-library';

describe('SkinTwin Formulation Vessel Prompt', () => {
  it('should be available in the prompt library', () => {
    const promptList = PromptLibrary.getList();
    const formulationVessel = promptList.find(p => p.id === 'formulationVessel');
    
    expect(formulationVessel).toBeDefined();
    expect(formulationVessel?.label).toBe('SkinTwin Formulation Vessel');
    expect(formulationVessel?.description).toContain('Virtual Turbo Reactor');
  });

  it('should generate a formulation vessel prompt', () => {
    const options = {
      cwd: '/test/path',
      allowedHtmlElements: ['p', 'div'],
      modificationTagName: 'modification',
      supabase: {
        isConnected: false,
        hasSelectedProject: false
      }
    };

    const prompt = PromptLibrary.getPropmtFromLibrary('formulationVessel', options);
    
    expect(prompt).toContain('SkinTwin Virtual Turbo Reactor Formulation Vessel');
    expect(prompt).toContain('virtual chemical reaction vessel');
    expect(prompt).toContain('formulation chemist');
    expect(prompt).toContain('SAFETY FIRST');
    expect(prompt).toContain('reaction_vessel_simulation');
  });

  it('should include required safety guidelines', () => {
    const options = {
      cwd: '/test/path',
      allowedHtmlElements: ['p'],
      modificationTagName: 'modification'
    };

    const prompt = PromptLibrary.getPropmtFromLibrary('formulationVessel', options);
    
    expect(prompt).toContain('NEVER recommend any restricted, banned, or potentially harmful chemicals');
    expect(prompt).toContain('Use only cosmetically safe ingredients');
    expect(prompt).toContain('FORBIDDEN INGREDIENTS');
    expect(prompt).toContain('Hydroquinone');
    expect(prompt).toContain('Mercury compounds');
  });

  it('should include vessel simulation instructions', () => {
    const options = {
      cwd: '/test/path',
      allowedHtmlElements: ['p'],
      modificationTagName: 'modification'
    };

    const prompt = PromptLibrary.getPropmtFromLibrary('formulationVessel', options);
    
    expect(prompt).toContain('VESSEL STATE TRACKING');
    expect(prompt).toContain('SEQUENTIAL REACTION PROCESSING');
    expect(prompt).toContain('Chemical equations for any reactions');
    expect(prompt).toContain('Interim Product Name');
  });

  it('should include proper output formatting', () => {
    const options = {
      cwd: '/test/path',
      allowedHtmlElements: ['p'],
      modificationTagName: 'modification'
    };

    const prompt = PromptLibrary.getPropmtFromLibrary('formulationVessel', options);
    
    expect(prompt).toContain('Table 1 - Formulation Details');
    expect(prompt).toContain('Table 2 - Ingredient Analysis');
    expect(prompt).toContain('MIXING INSTRUCTIONS');
    expect(prompt).toContain('VESSEL SIMULATION');
    expect(prompt).toContain('FINAL PRODUCT RECOMMENDATIONS');
  });

  it('should maintain scientific rigor with engaging tone', () => {
    const options = {
      cwd: '/test/path',
      allowedHtmlElements: ['p'],
      modificationTagName: 'modification'
    };

    const prompt = PromptLibrary.getPropmtFromLibrary('formulationVessel', options);
    
    expect(prompt).toContain('mad scientist enthusiasm');
    expect(prompt).toContain('humorous and friendly tone');
    expect(prompt).toContain('scientific accuracy');
    expect(prompt).toContain('technical rigor');
  });
});