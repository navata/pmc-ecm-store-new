'use client';

import { useAppConfig } from '@/hooks/common';
import { useCollection } from '@/hooks/product';
import { useState } from 'react';

export default function CollectionPage() {
  const [page, setPage] = useState(1);
  const { data, isValidating, mutate } = useCollection({
    id: 'Q29sbGVjdGlvbjo5MDg=',
    page: page,
    page_size: 20,
    sort_by: 'COLLECTION',
    order_by: 'ASC',
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => setPage(1)}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        1
      </button>
      <button
        onClick={() => setPage(2)}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        2
      </button>
      <button
        onClick={() => setPage(3)}
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        3
      </button>
      <button
        onClick={() =>
          mutate(
            (key: Array<any>) => {
              console.log(key);
              return key?.[1]?.page === 3;
            },
            undefined,
            { revalidate: true }
          )
        }
        className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
      >
        Mutate
      </button>
      {isValidating ? 'isValidating' : 'hello'}
      {data?.data?.products?.edges?.map?.((item: any) => (
        <div key={item.node.id}>{item.node.name}</div>
      ))}
    </main>
  );
}
