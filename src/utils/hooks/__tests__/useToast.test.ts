import { describe, it, expect, vi, beforeEach } from 'vitest';

import { reducer, type State, type Action } from '../useToast';

describe('useToast reducer', () => {
  const initialState: State = { toasts: [] };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('adds toast to state', () => {
    const toast = {
      id: '1',
      title: 'Test Toast',
      open: true,
    };
    const action: Action = { type: 'ADD_TOAST', toast };
    const newState = reducer(initialState, action);
    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual(toast);
  });

  it('enforces toast limit', () => {
    const state: State = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const action: Action = {
      type: 'ADD_TOAST',
      toast: { id: '3', open: true },
    };
    const newState = reducer(state, action);
    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0].id).toBe('3');
  });

  it('updates existing toast', () => {
    const state: State = {
      toasts: [{ id: '1', title: 'Old Title', open: true }],
    };
    const action: Action = {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'New Title' },
    };
    const newState = reducer(state, action);
    expect(newState.toasts[0].title).toBe('New Title');
  });

  it('dismisses specific toast', () => {
    const state: State = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const action: Action = { type: 'DISMISS_TOAST', toastId: '1' };
    const newState = reducer(state, action);
    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(true);
  });

  it('dismisses all toasts when no toastId provided', () => {
    const state: State = {
      toasts: [
        { id: '1', open: true },
        { id: '2', open: true },
      ],
    };
    const action: Action = { type: 'DISMISS_TOAST' };
    const newState = reducer(state, action);
    expect(newState.toasts.every((t) => !t.open)).toBe(true);
  });
});
