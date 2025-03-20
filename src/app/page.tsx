'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Item {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Modal {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<Modal>({
    show: false,
    message: '',
    type: 'success'
  });

  const closeModal = () => {
    setModal(prev => ({ ...prev, show: false }));
  };

  const fetchData = async () => {
    setLoading(true);
    
    try {
      console.log('开始发送请求...');
      const response = await fetch("/api/items");
      console.log('收到响应:', response.status);
      
      const data = await response.json();
      console.log('解析数据:', data);
      
      if (!response.ok) {
        throw new Error(data.error || '数据获取失败');
      }
      
      setItems(data);
      setModal({
        show: true,
        message: `数据库连接成功！获取到 ${data.length} 条数据。`,
        type: 'success'
      });
    } catch (err) {
      console.error("请求错误:", err);
      setModal({
        show: true,
        message: err instanceof Error 
          ? `连接失败: ${err.message}` 
          : '连接失败: 未知错误',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/test-connection');
      const data = await response.json();
      
      setModal({
        show: true,
        message: data.message,
        type: data.status === 'success' ? 'success' : 'error'
      });
    } catch (error) {
      setModal({
        show: true,
        message: '连接测试失败',
        type: 'error'
      });
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
          
          <div className="space-y-4">
            <button
              onClick={testConnection}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            >
              测试数据库连接
            </button>
            
            <button
              onClick={fetchData}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "加载中..." : "从 MongoDB 获取数据"}
            </button>
          </div>
          
          {/* 模态窗口 */}
          {modal.show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <div className={`text-lg mb-4 ${
                  modal.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {modal.type === 'success' ? '✅ ' : '❌ '}
                  {modal.message}
                </div>
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  关闭
                </button>
              </div>
            </div>
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
          ) : items.length === 0 && !loading && !modal.show ? (
            <p className="mt-4 text-gray-500">No items found. Your database might be empty.</p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
