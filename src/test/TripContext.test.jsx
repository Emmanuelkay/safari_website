import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React, { useEffect } from 'react';
import { TripProvider, useTrip } from '../context/TripContext';

const TestConsumer = ({ action }) => {
  const ctx = useTrip();
  useEffect(() => { if (action) action(ctx); }, []);
  return (
    <div>
      <span data-testid="guests">{ctx.trip.guests}</span>
      <span data-testid="dates">{ctx.trip.dates}</span>
      <span data-testid="package">{ctx.trip.package?.id || 'none'}</span>
      <span data-testid="addons">{ctx.trip.addons.map(a => a.id).join(',')}</span>
    </div>
  );
};

describe('TripContext', () => {
  it('provides default trip state', () => {
    render(
      <TripProvider>
        <TestConsumer />
      </TripProvider>
    );
    expect(screen.getByTestId('guests')).toHaveTextContent('2');
    expect(screen.getByTestId('dates')).toHaveTextContent('');
    expect(screen.getByTestId('package')).toHaveTextContent('none');
    expect(screen.getByTestId('addons')).toHaveTextContent('');
  });

  it('selects a package', () => {
    render(
      <TripProvider>
        <TestConsumer action={(ctx) => ctx.selectPackage({ id: 1, price: 95, title: 'Morning Safari' })} />
      </TripProvider>
    );
    expect(screen.getByTestId('package')).toHaveTextContent('1');
  });

  it('toggles addons on and off', () => {
    const addon = { id: 'balloon', name: 'Hot Air Balloon', price: 480, unit: 'pp' };
    let tripCtx;

    const Capture = () => {
      tripCtx = useTrip();
      return (
        <div>
          <span data-testid="addons">{tripCtx.trip.addons.map(a => a.id).join(',')}</span>
          <button data-testid="toggle" onClick={() => tripCtx.toggleAddon(addon)}>Toggle</button>
        </div>
      );
    };

    render(<TripProvider><Capture /></TripProvider>);

    // Add addon
    act(() => screen.getByTestId('toggle').click());
    expect(screen.getByTestId('addons')).toHaveTextContent('balloon');

    // Remove addon
    act(() => screen.getByTestId('toggle').click());
    expect(screen.getByTestId('addons')).toHaveTextContent('');
  });

  it('updates guest count', () => {
    let tripCtx;
    const Capture = () => {
      tripCtx = useTrip();
      return (
        <div>
          <span data-testid="guests">{tripCtx.trip.guests}</span>
          <button data-testid="update" onClick={() => tripCtx.updateGuests(5)}>Update</button>
        </div>
      );
    };

    render(<TripProvider><Capture /></TripProvider>);
    act(() => screen.getByTestId('update').click());
    expect(screen.getByTestId('guests')).toHaveTextContent('5');
  });

  it('updates dates', () => {
    let tripCtx;
    const Capture = () => {
      tripCtx = useTrip();
      return (
        <div>
          <span data-testid="dates">{tripCtx.trip.dates}</span>
          <button data-testid="update" onClick={() => tripCtx.updateDates('2026-06-15')}>Update</button>
        </div>
      );
    };

    render(<TripProvider><Capture /></TripProvider>);
    act(() => screen.getByTestId('update').click());
    expect(screen.getByTestId('dates')).toHaveTextContent('2026-06-15');
  });

  it('throws when useTrip is used outside provider', () => {
    const Bad = () => { useTrip(); return null; };
    expect(() => render(<Bad />)).toThrow('useTrip must be used within a TripProvider');
  });
});
