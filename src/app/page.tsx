'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/items');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setItems(data.items);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data from MongoDB. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          MongoDB Example with Netlify
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-1 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            MongoDB Connection Example
          </h2>
          
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Fetch Data from MongoDB'}
          </button>
          
          {error && (
            <p className="mt-4 text-red-500">{error}</p>
          )}
          
          {items.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-xl font-medium mb-2">Items from Database:</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item._id} className="p-3 bg-gray-100 dark:bg-neutral-800 rounded-md">
                    <h4 className="font-bold">{item.name}</h4>
                    <p>{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : items.length === 0 && !loading && !error ? (
            <p className="mt-4 text-gray-500">No items found. Your database might be empty.</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
