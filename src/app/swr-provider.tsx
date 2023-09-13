'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface Props {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: Props) => {
  return <SWRConfig>{children}</SWRConfig>;
};
