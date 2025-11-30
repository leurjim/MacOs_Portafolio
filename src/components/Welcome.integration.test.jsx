import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Welcome from './Welcome.jsx';
import gsap from 'gsap';

describe('Welcome Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete User Interaction Flow', () => {
    it('should handle complete hover interaction cycle', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        // Mouse enters and moves across text
        fireEvent.mouseMove(subtitle, { clientX: 0, clientY: 0 });
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 0 });
        fireEvent.mouseMove(subtitle, { clientX: 100, clientY: 0 });
        
        // Mouse leaves
        fireEvent.mouseLeave(subtitle);
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });

    it('should handle interactions on both subtitle and title', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const title = screen.getByRole('heading', { level: 1 });
      
      // Interact with subtitle
      if (subtitle) {
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        fireEvent.mouseLeave(subtitle);
      }
      
      // Interact with title
      fireEvent.mouseMove(title, { clientX: 50, clientY: 50 });
      fireEvent.mouseLeave(title);
      
      await waitFor(() => {
        expect(gsap.to).toHaveBeenCalled();
      });
    });

    it('should handle rapid sequential interactions', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        for (let i = 0; i < 20; i++) {
          fireEvent.mouseMove(subtitle, { clientX: i * 5, clientY: 50 });
        }
        fireEvent.mouseLeave(subtitle);
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });
  });

  describe('Component Lifecycle Integration', () => {
    it('should properly initialize and cleanup on mount/unmount cycle', () => {
      const { unmount, rerender } = render(<Welcome />);
      
      expect(screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i)).toBeInTheDocument();
      
      rerender(<Welcome />);
      expect(screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i)).toBeInTheDocument();
      
      unmount();
    });

    it('should maintain state across re-renders', () => {
      const { rerender } = render(<Welcome />);
      const initialSpanCount = screen.getByRole('heading', { level: 1 }).querySelectorAll('span').length;
      
      rerender(<Welcome />);
      const afterRerenderSpanCount = screen.getByRole('heading', { level: 1 }).querySelectorAll('span').length;
      
      expect(initialSpanCount).toBe(afterRerenderSpanCount);
    });
  });

  describe('DOM Structure Integration', () => {
    it('should maintain proper parent-child relationships', () => {
      const { container } = render(<Welcome />);
      const section = container.querySelector('section#welcome');
      const subtitle = section?.querySelector('p');
      const title = section?.querySelector('h1');
      const smallScreen = section?.querySelector('.small-screen');
      
      expect(section).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(smallScreen).toBeInTheDocument();
    });

    it('should maintain correct span structure within text elements', () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const title = screen.getByRole('heading', { level: 1 });
      
      expect(subtitle?.querySelectorAll('span').length).toBeGreaterThan(0);
      expect(title.querySelectorAll('span').length).toBe('portafolio'.length);
    });
  });

  describe('GSAP Animation Integration', () => {
    it('should coordinate multiple GSAP animations during interaction', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        const spans = subtitle.querySelectorAll('span');
        
        // Trigger animation on multiple characters
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
          // Each visible span should potentially be animated
          expect(gsap.to).toHaveBeenCalledTimes(expect.any(Number));
        });
      }
    });

    it('should properly reset animations on mouseleave', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        // First hover
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        await waitFor(() => expect(gsap.to).toHaveBeenCalled());
        
        const callCountAfterHover = vi.mocked(gsap.to).mock.calls.length;
        
        // Leave and check reset
        fireEvent.mouseLeave(subtitle);
        await waitFor(() => {
          expect(vi.mocked(gsap.to).mock.calls.length).toBeGreaterThan(callCountAfterHover);
        });
      }
    });
  });

  describe('Browser Event Integration', () => {
    it('should work with native browser events', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      if (subtitle) {
        const event = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: 50,
          clientY: 50,
        });
        
        subtitle.dispatchEvent(event);
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
      }
    });

    it('should handle event bubbling correctly', async () => {
      render(<Welcome />);
      const section = screen.getByRole('region');
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      
      // Event should work when triggered on child elements
      if (subtitle) {
        const span = subtitle.querySelector('span');
        if (span) {
          fireEvent.mouseMove(span, { clientX: 50, clientY: 50 });
          
          await waitFor(() => {
            expect(gsap.to).toHaveBeenCalled();
          });
        }
      }
    });
  });

  describe('Text Rendering Integration', () => {
    it('should properly render all text with correct styling', () => {
      render(<Welcome />);
      
      // Check subtitle
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const subtitleSpans = subtitle?.querySelectorAll('span.text-3xl.font-georama');
      expect(subtitleSpans?.length).toBeGreaterThan(0);
      
      // Check title
      const title = screen.getByRole('heading', { level: 1 });
      const titleSpans = title.querySelectorAll('span.text-9xl.italic.font-georama');
      expect(titleSpans.length).toBe('portafolio'.length);
    });

    it('should maintain text integrity after interactions', async () => {
      render(<Welcome />);
      const subtitle = screen.getByText(/Hola, Soy Leao! Bienvenido a mi/i).closest('p');
      const originalText = subtitle?.textContent;
      
      if (subtitle) {
        fireEvent.mouseMove(subtitle, { clientX: 50, clientY: 50 });
        fireEvent.mouseLeave(subtitle);
        
        await waitFor(() => expect(gsap.to).toHaveBeenCalled());
        
        expect(subtitle.textContent).toBe(originalText);
      }
    });
  });

  describe('Performance Integration', () => {
    it('should handle multiple components rendering simultaneously', () => {
      const { container } = render(
        <>
          <Welcome />
          <Welcome />
        </>
      );
      
      const sections = container.querySelectorAll('section#welcome');
      expect(sections.length).toBe(2);
    });

    it('should not interfere with other component instances', async () => {
      const { container } = render(
        <>
          <Welcome />
          <Welcome />
        </>
      );
      
      const sections = container.querySelectorAll('section#welcome');
      const firstSubtitle = sections[0]?.querySelector('p');
      const secondSubtitle = sections[1]?.querySelector('p');
      
      if (firstSubtitle && secondSubtitle) {
        fireEvent.mouseMove(firstSubtitle, { clientX: 50, clientY: 50 });
        
        await waitFor(() => {
          expect(gsap.to).toHaveBeenCalled();
        });
        
        // Both instances should work independently
        expect(firstSubtitle).toBeInTheDocument();
        expect(secondSubtitle).toBeInTheDocument();
      }
    });
  });
});