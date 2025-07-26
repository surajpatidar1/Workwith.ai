'use client';

import { useState } from 'react';

export default function TestComponent() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setImageURL('');

    try {
      const response = await fetch('/api/ai/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          publish: false,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong');
      }

      setImageURL(result.content);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Test Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Generating...' : 'Generate Image'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {imageURL && (
        <div className="mt-4">
          <img src={imageURL} alt="Generated" className="rounded shadow" />
        </div>
      )}
    </div>
  );
}
