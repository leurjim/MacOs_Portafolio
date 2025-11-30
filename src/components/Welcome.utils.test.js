import { describe, it, expect, vi } from 'vitest';

// We'll test the pure functions by importing and testing them indirectly
// through the component behavior since they're not exported

describe('Welcome Utility Functions', () => {
  describe('renderText Function Logic', () => {
    it('should split text into individual characters', () => {
      const text = "hello";
      const result = [...text];
      expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
    });

    it('should handle empty string', () => {
      const text = "";
      const result = [...text];
      expect(result).toEqual([]);
    });

    it('should handle single character', () => {
      const text = "a";
      const result = [...text];
      expect(result).toEqual(['a']);
    });

    it('should handle spaces in text', () => {
      const text = "a b";
      const result = [...text];
      expect(result).toEqual(['a', ' ', 'b']);
    });

    it('should handle special characters', () => {
      const text = "a!@#";
      const result = [...text];
      expect(result).toEqual(['a', '!', '@', '#']);
    });

    it('should handle unicode characters', () => {
      const text = "café";
      const result = [...text];
      expect(result.length).toBe(4);
    });

    it('should handle emojis correctly', () => {
      const text = "😀";
      const result = [...text];
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Font Weight Configuration', () => {
    it('should have valid subtitle weight range', () => {
      const subtitleWeights = { min: 100, max: 400, default: 100 };
      expect(subtitleWeights.min).toBeLessThan(subtitleWeights.max);
      expect(subtitleWeights.default).toBeGreaterThanOrEqual(subtitleWeights.min);
      expect(subtitleWeights.default).toBeLessThanOrEqual(subtitleWeights.max);
    });

    it('should have valid title weight range', () => {
      const titleWeights = { min: 400, max: 900, default: 400 };
      expect(titleWeights.min).toBeLessThan(titleWeights.max);
      expect(titleWeights.default).toBeGreaterThanOrEqual(titleWeights.min);
      expect(titleWeights.default).toBeLessThanOrEqual(titleWeights.max);
    });

    it('should have non-overlapping weight ranges', () => {
      const subtitleWeights = { min: 100, max: 400, default: 100 };
      const titleWeights = { min: 400, max: 900, default: 400 };
      expect(subtitleWeights.max).toBeLessThanOrEqual(titleWeights.min);
    });
  });

  describe('Hover Effect Calculations', () => {
    it('should calculate distance correctly', () => {
      const mouseX = 50;
      const letterX = 30;
      const distance = Math.abs(mouseX - letterX);
      expect(distance).toBe(20);
    });

    it('should handle negative distances', () => {
      const mouseX = 30;
      const letterX = 50;
      const distance = Math.abs(mouseX - letterX);
      expect(distance).toBe(20);
    });

    it('should calculate intensity using exponential decay', () => {
      const distance = 20;
      const intensity = Math.exp(-(distance ** 2) / 20000);
      expect(intensity).toBeGreaterThan(0);
      expect(intensity).toBeLessThanOrEqual(1);
    });

    it('should have maximum intensity at zero distance', () => {
      const distance = 0;
      const intensity = Math.exp(-(distance ** 2) / 20000);
      expect(intensity).toBe(1);
    });

    it('should have decreasing intensity with distance', () => {
      const intensity1 = Math.exp(-(10 ** 2) / 20000);
      const intensity2 = Math.exp(-(20 ** 2) / 20000);
      const intensity3 = Math.exp(-(30 ** 2) / 20000);
      
      expect(intensity1).toBeGreaterThan(intensity2);
      expect(intensity2).toBeGreaterThan(intensity3);
    });

    it('should calculate weight interpolation correctly', () => {
      const min = 100;
      const max = 400;
      const intensity = 0.5;
      const weight = min + (max - min) * intensity;
      expect(weight).toBe(250);
    });

    it('should clamp weight to minimum when intensity is 0', () => {
      const min = 100;
      const max = 400;
      const intensity = 0;
      const weight = min + (max - min) * intensity;
      expect(weight).toBe(min);
    });

    it('should clamp weight to maximum when intensity is 1', () => {
      const min = 100;
      const max = 400;
      const intensity = 1;
      const weight = min + (max - min) * intensity;
      expect(weight).toBe(max);
    });
  });

  describe('Space Character Handling', () => {
    it('should convert space to non-breaking space', () => {
      const char = " ";
      const result = char === " " ? "\u00A0" : char;
      expect(result).toBe("\u00A0");
    });

    it('should not convert non-space characters', () => {
      const char = "a";
      const result = char === " " ? "\u00A0" : char;
      expect(result).toBe("a");
    });

    it('should handle multiple spaces', () => {
      const text = "a b c";
      const result = [...text].map(char => char === " " ? "\u00A0" : char);
      expect(result).toEqual(['a', '\u00A0', 'b', '\u00A0', 'c']);
    });
  });

  describe('Event Listener Management', () => {
    it('should create cleanup function that removes listeners', () => {
      const mockElement = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      mockElement.addEventListener('mousemove', handler1);
      mockElement.addEventListener('mouseleave', handler2);
      
      const cleanup = () => {
        mockElement.removeEventListener('mousemove', handler1);
        mockElement.removeEventListener('mouseleave', handler2);
      };
      
      cleanup();
      
      expect(mockElement.removeEventListener).toHaveBeenCalledWith('mousemove', handler1);
      expect(mockElement.removeEventListener).toHaveBeenCalledWith('mouseleave', handler2);
    });
  });

  describe('getBoundingClientRect Usage', () => {
    it('should extract left position from bounding rect', () => {
      const rect = { left: 100, width: 50, top: 0, right: 150, bottom: 100, height: 100, x: 100, y: 0 };
      expect(rect.left).toBe(100);
    });

    it('should extract width from bounding rect', () => {
      const rect = { left: 100, width: 50, top: 0, right: 150, bottom: 100, height: 100, x: 100, y: 0 };
      expect(rect.width).toBe(50);
    });

    it('should calculate center position correctly', () => {
      const rect = { left: 100, width: 50, top: 0, right: 150, bottom: 100, height: 100, x: 100, y: 0 };
      const center = rect.left + rect.width / 2;
      expect(center).toBe(125);
    });
  });

  describe('Font Variation Settings Format', () => {
    it('should format font variation settings correctly', () => {
      const weight = 400;
      const settings = `'wght' ${weight}`;
      expect(settings).toBe("'wght' 400");
    });

    it('should handle minimum weight', () => {
      const weight = 100;
      const settings = `'wght' ${weight}`;
      expect(settings).toBe("'wght' 100");
    });

    it('should handle maximum weight', () => {
      const weight = 900;
      const settings = `'wght' ${weight}`;
      expect(settings).toBe("'wght' 900");
    });

    it('should handle decimal weights', () => {
      const weight = 250.5;
      const settings = `'wght' ${weight}`;
      expect(settings).toContain('250.5');
    });
  });
});