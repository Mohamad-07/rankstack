'use client';

import useNetworkData from './useNetworkData';

const useIpDetails = () => {
  const { loading, error, data } = useNetworkData();
  return { loading, error, data };
};

export default useIpDetails;
