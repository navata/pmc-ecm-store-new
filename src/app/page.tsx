'use client';

import { signIn, signUp, getUser, getAdmin, getAll } from '@/lib/test';

const a: string = 'nguyen van a';
console.log(a);

export default function Home() {
  const getMultiUser = () => {
    getAll();
    getUser();
    getAdmin();
    getUser();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{process.env.NEXT_PUBLIC_MODE}</div>
      <button
        onClick={signUp}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        signUp
      </button>
      <button
        onClick={signIn}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        signInWindow
      </button>
      <button
        onClick={getMultiUser}
        className="mr-6 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        getUser
      </button>
      <div>Demo from window</div>
    </main>
  );
}
