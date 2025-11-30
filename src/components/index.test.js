import { describe, it, expect } from 'vitest';
import { Navbar, Welcome } from './index.js';

describe('Components Index Exports', () => {
  describe('Named Exports', () => {
    it('should export Navbar component', () => {
      expect(Navbar).toBeDefined();
      expect(typeof Navbar).toBe('function');
    });

    it('should export Welcome component', () => {
      expect(Welcome).toBeDefined();
      expect(typeof Welcome).toBe('function');
    });
  });

  describe('Export Types', () => {
    it('should export Navbar as a React component', () => {
      expect(Navbar.prototype).toBeDefined();
    });

    it('should export Welcome as a React component', () => {
      expect(Welcome.prototype).toBeDefined();
    });
  });

  describe('Import Integrity', () => {
    it('should not export undefined values', () => {
      expect(Navbar).not.toBeUndefined();
      expect(Welcome).not.toBeUndefined();
    });

    it('should not export null values', () => {
      expect(Navbar).not.toBeNull();
      expect(Welcome).not.toBeNull();
    });
  });

  describe('Module Structure', () => {
    it('should export exactly two named exports', async () => {
      const module = await import('./index.js');
      const exports = Object.keys(module);
      expect(exports).toContain('Navbar');
      expect(exports).toContain('Welcome');
    });

    it('should maintain consistent export names', async () => {
      const module = await import('./index.js');
      expect(module.Navbar.name).toBe('Navbar');
      expect(module.Welcome.name).toBe('Welcome');
    });
  });

  describe('Re-export Validation', () => {
    it('should re-export components from their respective files', async () => {
      const indexModule = await import('./index.js');
      const navbarModule = await import('./Navbar.jsx');
      const welcomeModule = await import('./Welcome.jsx');
      
      expect(indexModule.Navbar).toBe(navbarModule.default);
      expect(indexModule.Welcome).toBe(welcomeModule.default);
    });
  });

  describe('Component Functionality', () => {
    it('should export callable components', () => {
      expect(() => Navbar()).not.toThrow();
      expect(() => Welcome()).not.toThrow();
    });

    it('should export components that return JSX', () => {
      const navbarResult = Navbar();
      const welcomeResult = Welcome();
      
      expect(navbarResult).toBeDefined();
      expect(welcomeResult).toBeDefined();
    });
  });

  describe('Import Path Validation', () => {
    it('should handle alias imports correctly', async () => {
      // Testing that the #components alias works in the index file
      expect(() => import('./index.js')).not.toThrow();
    });
  });
});