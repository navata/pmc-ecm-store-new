'use client';

import { useAppConfig } from '@/hooks/common';

export default function Home() {
  const { data, isLoading, mutate } = useAppConfig();
  // const { mutate } = useSWR(
  //   {
  //     url: 'https://api-gateway.dev.pharmacity.io/customers/auth/me',
  //     method: 'GET',
  //     isAuth: true,
  //   },
  //   { revalidateOnMount: false }
  // );
  console.log('data2', data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => mutate()}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        Test2
      </button>
      {isLoading ? 'loading' : 'hello'}
    </main>
  );
}
