import { getMainData } from '@/lib/api/common';
import React from 'react';

export const getGalleryBySlug = (galleries: Record<string, any>[], slug: string) => {
  if (galleries) {
    const gallery = galleries.find((item: Record<string, any>) => item.slug === slug);
    return gallery;
  }
  return null;
};
export default async function Navbar() {
  const { data: mainData } = await getMainData();
  const quickLinkHeader = getGalleryBySlug(mainData?.menus?.data, 'menu-top-vi');
  // console.log(quickLinkHeader);

  // console.debug(JSON.stringify(quickLinkHeader, null, 2));
  return (
    <nav className="fixed left-0 top-0 z-20 w-full bg-sky-700">
      <div className="container mx-auto w-full py-2">
        <div className="relative flex items-center justify-between py-2">
          <div>
            <p className="text-xs text-white">
              Hotline Đặt hàng (Miễn phí)
              <span className="ml-2 rounded-3xl bg-sky-600 px-4">1800 6821</span>
            </p>
          </div>
          <div className="flex">
            <div className="flex px-2">
              {quickLinkHeader?.menu_nodes_parent?.map((item: Record<string, any>) => (
                <a
                  key={item.id}
                  href="#"
                  className="h-max border-l border-r border-l-transparent px-2 text-xs text-white"
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="flex text-xs font-bold text-white">
              NavaTa
              <img
                className="ml-1 h-5 w-5 rounded-full border"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-between py-2">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-12 w-auto"
                src="https://pmc-ecm-store.dev.pharmacity.io/icons/logo.svg"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 "
                >
                  Danh mục
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-sky-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            <div className="relative ml-3"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
