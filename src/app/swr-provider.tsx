'use client';
import { doRequest } from '@/lib/services';
import React from 'react';
import { SWRConfig } from 'swr';

interface Props {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => {
          console.log('resource', resource);
          console.log('init', init);
          return doRequest(resource);
        },
        // provider: () => new Map(),
      }}
    >
      {children}
    </SWRConfig>
  );
};
