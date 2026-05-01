'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function TestPage() {
  const [result, setResult] = useState<string>('');

  const handleCreate = async () => {
    const { data, error } = await api.users.post({
      email: `test-${Date.now()}@test.com`,
      name: 'Test User',
      password: '12345678',
    });

    if (error) {
      setResult(`Error ${error.status}: ${JSON.stringify(error.value)}`);
      return;
    }

    setResult(`Created user: ${data.id} (${data.email})`);
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Eden Treaty Test</h1>
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Create test user
      </button>
      <pre className="bg-gray-100 p-4 rounded">{result}</pre>
    </div>
  );
}