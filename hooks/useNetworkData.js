'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getNetworkSnapshot,
  normalizeSnapshot,
  requestLivePosition,
  resolveLiveLocation,
} from '@/lib/network-diagnostics';

const errorMessage = (error) =>
  error instanceof Error ? error.message : 'Unable to complete the lookup.';

export default function useNetworkData() {
  const [state, setState] = useState({ loading: true, data: null, error: null, errors: {} });
  const [gps, setGps] = useState({ gpsLoading: false, gpsError: null, position: null });
  const mounted = useRef(false);

  const load = useCallback(async (force = false) => {
    if (typeof window === 'undefined') return;
    setState((previous) => ({ ...previous, loading: true, error: null, errors: {} }));
    try {
      const result = await getNetworkSnapshot({ force });
      if (mounted.current) {
        setState({ loading: false, data: result.data, error: null, errors: result.errors });
      }
    } catch (error) {
      if (mounted.current) {
        setState({ loading: false, data: null, error: errorMessage(error), errors: {} });
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load(false);
    return () => {
      mounted.current = false;
    };
  }, [load]);

  const rescan = useCallback(() => load(true), [load]);

  const refineWithGps = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    setGps({ gpsLoading: true, gpsError: null, position: null });

    try {
      const position = await requestLivePosition();
      const location = await resolveLiveLocation(position);
      if (!mounted.current) return null;

      setGps({ gpsLoading: false, gpsError: null, position });
      setState((previous) =>
        previous.data
          ? {
              ...previous,
              data: normalizeSnapshot({
                ipAddress: previous.data.raw.ipAddress,
                connectionProfile: previous.data.raw.connectionProfile,
                ipLocation: previous.data.raw.locationProfile,
                locationProfile: location,
                source: 'gps',
                livePosition: position,
              }),
            }
          : previous
      );
      return { position, location };
    } catch (error) {
      if (mounted.current) {
        setGps({ gpsLoading: false, gpsError: errorMessage(error), position: null });
      }
      return null;
    }
  }, []);

  return {
    ...state,
    ...gps,
    rescan,
    refineWithGps,
    hasGps: state.data?.lookupSource === 'gps',
  };
}
