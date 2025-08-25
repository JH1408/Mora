import { renderHook } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useIsMobile } from '../useIsMobile';

describe('useIsMobile', () => {
  const mockMatchMedia = vi.fn();
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();

  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });

    // Mock addEventListener and removeEventListener
    Object.defineProperty(window, 'addEventListener', {
      writable: true,
      value: mockAddEventListener,
    });

    Object.defineProperty(window, 'removeEventListener', {
      writable: true,
      value: mockRemoveEventListener,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns false for desktop width', () => {
    window.innerWidth = 1024;
    mockMatchMedia.mockReturnValue({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true for mobile width', () => {
    window.innerWidth = 375;
    mockMatchMedia.mockReturnValue({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('sets up media query listener', () => {
    mockMatchMedia.mockReturnValue({
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    });

    renderHook(() => useIsMobile());

    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)');
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });
});
