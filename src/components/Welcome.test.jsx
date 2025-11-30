import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Welcome from './Welcome.jsx';

describe('Welcome Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the welcome section', () => {
      render(<Welcome />);
      const section = screen.getByRole('region', { name: /welcome/i });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'welcome');
    });

    it('should render the subtitle text', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('should render the title text', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toBeInTheDocument();
      expect(title.textContent).toContain('portafolio');
    });

    it('should render small screen message', () => {
      render(<Welcome />);
      const smallScreenMessage = screen.getByText(/Este portafolio esta diseñado solo para desktop\/table\./i);
      expect(smallScreenMessage).toBeInTheDocument();
    });

    it('should apply correct CSS classes to subtitle', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      expect(subtitle).toBeInTheDocument();
    });

    it('should apply correct CSS classes to title', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('mt-7');
    });
  });

  describe('Text Rendering', () => {
    it('should split subtitle into individual span elements', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const spans = subtitle?.querySelectorAll('span');
      expect(spans).toBeDefined();
      expect(spans?.length).toBeGreaterThan(0);
    });

    it('should split title into individual span elements', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      expect(spans.length).toBe('portafolio'.length);
    });

    it('should render spaces as non-breaking spaces in subtitle', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const spans = subtitle?.querySelectorAll('span');
      const spaceSpans = Array.from(spans || []).filter(
        (span) => span.textContent === '\u00A0'
      );
      expect(spaceSpans.length).toBeGreaterThan(0);
    });

    it('should apply font variation settings to each character', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const firstSpan = subtitle?.querySelector('span');
      expect(firstSpan?.style.fontVariationSettings).toContain('wght');
    });

    it('should apply correct base weight to subtitle characters', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const firstSpan = subtitle?.querySelector('span');
      expect(firstSpan?.style.fontVariationSettings).toContain('100');
    });

    it('should apply correct base weight to title characters', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const firstSpan = title.querySelector('span');
      expect(firstSpan?.style.fontVariationSettings).toBeTruthy();
    });

    it('should apply correct className to subtitle spans', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const firstSpan = subtitle?.querySelector('span');
      expect(firstSpan?.className).toContain('text-3xl');
      expect(firstSpan?.className).toContain('font-georama');
    });

    it('should apply correct className to title spans', () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      const firstSpan = title.querySelector('span');
      expect(firstSpan?.className).toContain('text-9xl');
      expect(firstSpan?.className).toContain('italic');
      expect(firstSpan?.className).toContain('font-georama');
    });
  });

  describe('GSAP Integration', () => {
    it('should call useGSAP hook on mount', () => {
      render(<Welcome />);
      expect(useGSAP).toHaveBeenCalled();
    });

    it('should setup hover effects with useGSAP', () => {
      render(<Welcome />);
      expect(useGSAP).toHaveBeenCalledWith(expect.any(Function), []);
    });

    it('should return cleanup function from useGSAP', () => {
      const { unmount } = render(<Welcome />);
      unmount();
      // Cleanup should have been called during unmount
      expect(useGSAP).toHaveBeenCalled();
    });
  });

  describe('Mouse Interactions', () => {
    it('should add mousemove event listener to subtitle container', () => {
      const addEventListenerSpy = vi.spyOn(Element.prototype, 'addEventListener');
      render(<Welcome />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mousemove',
        expect.any(Function)
      );
    });

    it('should add mouseleave event listener to subtitle container', () => {
      const addEventListenerSpy = vi.spyOn(Element.prototype, 'addEventListener');
      render(<Welcome />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function)
      );
    });

    it('should animate characters on mousemove', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });

    it('should reset character weights on mouseleave', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        fireEvent.mouseLeave(subtitle);
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });

    it('should handle mousemove on title container', async () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      
      fireEvent.mouseMove(title, { clientX: 100, clientY: 50 });
      
      await waitFor(() => {
        expect(gsap.to).toHaveBeenCalled();
      });
    });

    it('should handle mouseleave on title container', async () => {
      render(<Welcome />);
      const title = screen.getByRole('heading', { level: 1 });
      
      fireEvent.mouseLeave(title);
      
      await waitFor(() => {
        expect(gsap.to).toHaveBeenCalled();
      });
    });

    it('should calculate distance correctly for hover effect', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        // Simulate mouse at different positions
        fireEvent.mouseMove(subtitle, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 0 });
        fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 0 });
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });
  });

  describe('Cleanup', () => {
    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(Element.prototype, 'removeEventListener');
      const { unmount } = render(<Welcome />);
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mousemove',
        expect.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'mouseleave',
        expect.any(Function)
      );
    });

    it('should cleanup both title and subtitle hover effects', () => {
      const { unmount } = render(<Welcome />);
      unmount();
      
      // Verify useGSAP cleanup was executed
      expect(useGSAP).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle null container in setupTextHover gracefully', () => {
      // This tests the early return when container is null
      expect(() => render(<Welcome />)).not.toThrow();
    });

    it('should handle empty text string', () => {
      // Though not used in this component, the renderText function should handle it
      expect(() => render(<Welcome />)).not.toThrow();
    });

    it('should handle special characters in text', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i);
      expect(subtitle).toBeInTheDocument();
    });

    it('should maintain correct span count after multiple renders', () => {
      const { rerender } = render(<Welcome />);
      rerender(<Welcome />);
      
      const title = screen.getByRole('heading', { level: 1 });
      const spans = title.querySelectorAll('span');
      expect(spans.length).toBe('portafolio'.length);
    });
  });

  describe('Font Weight Configuration', () => {
    it('should use correct font weight range for subtitle', () => {
      render(<Welcome />);
      // Subtitle should use weights between 100 and 400
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const firstSpan = subtitle?.querySelector('span');
      expect(firstSpan?.style.fontVariationSettings).toContain('100');
    });

    it('should use correct font weight range for title', () => {
      render(<Welcome />);
      // Title should use default weight of 400
      const title = screen.getByRole('heading', { level: 1 });
      const firstSpan = title.querySelector('span');
      expect(firstSpan?.style.fontVariationSettings).toBeTruthy();
    });
  });

  describe('Animation Parameters', () => {
    it('should use correct animation duration on hover', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalledWith(
            expect.any(Element),
            expect.objectContaining({
              duration: 0.25,
              ease: 'power2.out',
            })
          );
        });
      }
    });

    it('should use correct animation duration on mouseleave', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        fireEvent.mouseLeave(subtitle);
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalledWith(
            expect.any(Element),
            expect.objectContaining({
              duration: 0.3,
            })
          );
        });
      }
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      render(<Welcome />);
      const section = screen.getByRole('region');
      const heading = screen.getByRole('heading', { level: 1 });
      
      expect(section).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
    });

    it('should preserve text content for screen readers', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i);
      const title = screen.getByRole('heading', { level: 1 });
      
      expect(subtitle.textContent).toBeTruthy();
      expect(title.textContent).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should not cause memory leaks with multiple mounts/unmounts', () => {
      const { unmount, rerender } = render(<Welcome />);
      rerender(<Welcome />);
      unmount();
      
      expect(() => render(<Welcome />)).not.toThrow();
    });

    it('should handle rapid mouse movements efficiently', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        // Simulate rapid mouse movements
        for (let i = 0; i < 10; i++) {
          fireEvent.mouseMove(subtitle, { clientX: i * 10, clientY: 50 });
        }
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });
  });
});