import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Mock the components
vi.mock('#components', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
  Welcome: () => <section data-testid="welcome">Welcome</section>,
}));

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render the main element', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should render Navbar component', () => {
      render(<App />);
      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();
    });

    it('should render Welcome component', () => {
      render(<App />);
      const welcome = screen.getByTestId('welcome');
      expect(welcome).toBeInTheDocument();
    });

    it('should render Navbar before Welcome', () => {
      render(<App />);
      const main = screen.getByRole('main');
      const children = Array.from(main.children);
      
      expect(children[0]).toHaveAttribute('data-testid', 'navbar');
      expect(children[1]).toHaveAttribute('data-testid', 'welcome');
    });
  });

  describe('Component Structure', () => {
    it('should have exactly two child components', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main.children).toHaveLength(2);
    });

    it('should maintain correct component hierarchy', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      const navbar = main?.querySelector('[data-testid="navbar"]');
      const welcome = main?.querySelector('[data-testid="welcome"]');
      
      expect(main).toBeInTheDocument();
      expect(navbar).toBeInTheDocument();
      expect(welcome).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should export App as default export', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });

    it('should be a valid React component', () => {
      expect(() => render(<App />)).not.toThrow();
    });

    it('should render without props', () => {
      expect(() => render(<App />)).not.toThrow();
    });
  });

  describe('Stability', () => {
    it('should render consistently on multiple mounts', () => {
      const { unmount, rerender } = render(<App />);
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('welcome')).toBeInTheDocument();
      
      rerender(<App />);
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('welcome')).toBeInTheDocument();
      
      unmount();
    });

    it('should not throw errors on unmount', () => {
      const { unmount } = render(<App />);
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should use semantic HTML with main element', () => {
      render(<App />);
      const main = screen.getByRole('main');
      expect(main.tagName).toBe('MAIN');
    });

    it('should have proper document structure', () => {
      const { container } = render(<App />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });
});