'use client';

import { FileUpload } from '@/components/ui/file-upload';
import { LoaderOne } from '@/components/ui/loader';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Eraser, Sparkles } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';

function Page() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const { getToken } = useAuth();

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const onSubmitHandler = async () => {
    if (files.length === 0) {
      toast.error('Please upload a file first');
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      const formData = new FormData();
      formData.append('image', files[0]);

      const { data } = await axios.post(
        '/api/ai/removeBackgroundImage',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || 'Failed to process image');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
        {/* Upload Section */}
        <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 text-[#ed7777]" />
            <h1 className="text-xl font-bold">Background Removal</h1>
          </div>

          <p className="mt-8 text-sm font-medium">Image Upload</p>
          <div className="w-full max-w-4xl mx-auto min-h-48 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg my-5">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <p className="text-sm font-medium">Support JPG, PNG and other formats</p>

          <br />

          {loading ? (
            <LoaderOne />
          ) : (
            <button
              className="bg-gradient-to-r from-orange-200 to-red-400 rounded-lg p-3 flex gap-3"
              onClick={onSubmitHandler}
            >
              <Eraser className="w-5" />
              Remove Background
            </button>
          )}
        </div>

        {/* Processed Image Section */}
        <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#ed7777]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-sm flex-col items-center gap-5 text-gray-400 text-center">
                <Eraser className="w-5 mx-auto" />
                <p>Upload image and click "Remove Background" to get started</p>
              </div>
            </div>
          ) : (
            <div className="relative w-[500px] h-[500px] flex items-center justify-center mt-5">
              <Image
                src={content}
                alt="AI Generated Image"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
