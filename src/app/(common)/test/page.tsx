'use client';

import { useProductList } from '@/hooks/product';
import { useEffect } from 'react';

function exportUserInfo(webLinks: string) {
  // const fileData = JSON.stringify(userInfo);
  const blob = new Blob([webLinks], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'user-info.txt';
  link.href = url;
  link.click();
}

export default function Home() {
  const { data, isLoading } = useProductList({ page: 1 });
  const { data: data2, isLoading: isLoading2 } = useProductList({ page: 2 });

  useEffect(() => {
    if (data && data2 && !isLoading && !isLoading2) {
      const productList = data?.data?.data?.products?.edges;
      const productList2 = data2?.data?.data?.products?.edges;
      let webLinks = '';
      let index = 1;
      productList.forEach((product: any) => {
        webLinks = webLinks + `${index}. https://www.pharmacity.vn/${product?.node?.slug}.html\r`;
        index = index + 1;
      });
      productList2.forEach((product: any) => {
        webLinks = webLinks + `${index}. https://www.pharmacity.vn/${product?.node?.slug}.html\r`;
        index = index + 1;
      });
      exportUserInfo(webLinks);
    }
  }, [isLoading, isLoading2]);

  return <div>{'ABC'}</div>;
}
