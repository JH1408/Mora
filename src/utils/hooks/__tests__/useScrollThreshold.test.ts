import { renderHook, act } from '@testing-library/react';

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useScrollThreshold } from '../useScrollThreshold';

describe('useScrollThreshold', () => {
  const mockAddEventListener = vi.fn();
  const mockRemoveEventListener = vi.fn();

  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
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

  it('returns false when scroll is below threshold', () => {
    window.scrollY = 25;
    const { result } = renderHook(() => useScrollThreshold(50));
    expect(result.current).toBe(false);
  });

  it('returns true when scroll is above threshold', () => {
    let scrollHandler: (() => void) | null = null;
    mockAddEventListener.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler;
      }
    });

    const { result } = renderHook(() => useScrollThreshold(50));

    // Initially false
    expect(result.current).toBe(false);

    // Simulate scroll above threshold
    act(() => {
      if (scrollHandler) {
        window.scrollY = 75;
        scrollHandler();
      }
    });

    expect(result.current).toBe(true);
  });

  it('uses default threshold of 50', () => {
    let scrollHandler: (() => void) | null = null;
    mockAddEventListener.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler;
      }
    });

    const { result } = renderHook(() => useScrollThreshold());

    // Initially false
    expect(result.current).toBe(false);

    // Simulate scroll above threshold
    act(() => {
      if (scrollHandler) {
        window.scrollY = 60;
        scrollHandler();
      }
    });

    expect(result.current).toBe(true);
  });

  it('sets up scroll event listener', () => {
    renderHook(() => useScrollThreshold(50));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('updates state when scroll event fires', () => {
    let scrollHandler: (() => void) | null = null;
    mockAddEventListener.mockImplementation((event, handler) => {
      if (event === 'scroll') {
        scrollHandler = handler;
      }
    });

    const { result } = renderHook(() => useScrollThreshold(50));

    // Initially false
    expect(result.current).toBe(false);

    // Simulate scroll above threshold
    act(() => {
      if (scrollHandler) {
        window.scrollY = 75;
        scrollHandler();
      }
    });

    expect(result.current).toBe(true);
  });
});
