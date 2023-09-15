'use client';

import { useAppConfig } from '@/hooks/common';

export default function Home() {
  // const { cache, ...extraConfig } = useSWRConfig();
  const { data, isLoading, isValidating, mutate } = useAppConfig();
  // const { mutate } = useSWR(
  //   {
  //     url: 'https://api-gateway.dev.pharmacity.io/customers/auth/me',
  //     method: 'GET',
  //     isAuth: true,
  //   },
  //   { revalidateOnMount: false }
  // );
  console.log('isLoading', isLoading);
  console.log('isValidating', isValidating);
  console.log('data', data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => mutate({ data123: {} })}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        ABC
      </button>
      {isLoading ? 'loading' : 'hello'}
    </main>
  );
}
