'use client';

import React, { useState, useEffect } from 'react';
import { useUpload } from '../../../features/storage/hooks/useUpload';
import { useDownload } from '../../../features/storage/hooks/useDownload';
import { useStorageFile } from '../../../features/storage/hooks/useStorageFile';
import { StorageBucket } from '../../../types/storage';
import { getStorageService } from '../../../features/storage/service';
import { createClient } from '../../../lib/supabase/client';

export default function StoragePlayground() {
  const { upload, replace, isUploading, progress, error: uploadError } = useUpload();
  const { download, isDownloading, error: downloadError } = useDownload();
  
  const [bucket, setBucket] = useState<StorageBucket>('avatars');
  const [fileMetadataId, setFileMetadataId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  
  const { metadata, url, isLoading: isFileLoading } = useStorageFile(fileMetadataId || null);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        // Fallback for tests if unauthenticated
        setUserId('00000000-0000-0000-0000-000000000000');
      }
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const res = await upload(file, { bucket, path: 'dev-test' }, userId);
    if (res) {
      setMessage(`Upload successful! File ID: ${res.id}`);
      setFileMetadataId(res.id);
    } else {
      setMessage('Upload failed. Check error below.');
    }
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    if (!fileMetadataId) return setMessage('Provide a file ID first');
    
    const file = e.target.files[0];
    const res = await replace(fileMetadataId, file);
    if (res) {
      setMessage(`Replace successful! Version is now ${res.version}`);
    } else {
      setMessage('Replace failed. Check error below.');
    }
  };

  const handleDelete = async () => {
    if (!fileMetadataId) return setMessage('Provide a file ID first');
    const service = getStorageService();
    const res = await service.delete(fileMetadataId);
    if (res.success) {
      setMessage('Deleted permanently.');
      setFileMetadataId('');
    } else {
      setMessage(`Delete failed: ${res.error.message}`);
    }
  };

  const handleSoftDelete = async () => {
    if (!fileMetadataId) return setMessage('Provide a file ID first');
    const service = getStorageService();
    const res = await service.softDelete(fileMetadataId);
    if (res.success) {
      setMessage('Soft deleted.');
    } else {
      setMessage(`Soft Delete failed: ${res.error.message}`);
    }
  };

  const handleRestore = async () => {
    if (!fileMetadataId) return setMessage('Provide a file ID first');
    const service = getStorageService();
    const res = await service.restore(fileMetadataId);
    if (res.success) {
      setMessage('Restored.');
    } else {
      setMessage(`Restore failed: ${res.error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Storage Playground</h1>
      
      <div className="bg-white shadow p-6 rounded-lg mb-6 border">
        <h2 className="text-xl font-semibold mb-4">1. Upload File</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bucket</label>
          <select 
            value={bucket} 
            onChange={(e) => setBucket(e.target.value as StorageBucket)}
            className="border rounded p-2 w-full max-w-xs"
          >
            <option value="avatars">avatars</option>
            <option value="submissions">submissions</option>
            <option value="presentations">presentations</option>
            <option value="videos">videos</option>
            <option value="documents">documents</option>
            <option value="assets">assets</option>
          </select>
        </div>
        
        <input type="file" onChange={handleUpload} disabled={isUploading || !userId} className="mb-2 block" />
        
        {isUploading && <p className="text-blue-600">Uploading... {progress}%</p>}
        {uploadError && <p className="text-red-600">Error: {uploadError.message} ({uploadError.code})</p>}
      </div>

      <div className="bg-white shadow p-6 rounded-lg mb-6 border">
        <h2 className="text-xl font-semibold mb-4">2. Manage File</h2>
        
        <div className="mb-4 flex gap-2 items-center">
          <input 
            type="text" 
            placeholder="File Metadata ID" 
            value={fileMetadataId}
            onChange={(e) => setFileMetadataId(e.target.value)}
            className="border p-2 w-full max-w-md rounded"
          />
        </div>

        {message && <div className="p-4 bg-gray-100 text-gray-800 rounded mb-4">{message}</div>}
        
        <div className="flex gap-2 flex-wrap mb-6">
          <label className="bg-blue-100 text-blue-800 px-4 py-2 rounded cursor-pointer hover:bg-blue-200">
            Replace File
            <input type="file" onChange={handleReplace} className="hidden" />
          </label>
          
          <button 
            onClick={() => download(fileMetadataId)} 
            disabled={!fileMetadataId || isDownloading}
            className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 disabled:opacity-50"
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </button>

          <button onClick={handleSoftDelete} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200">
            Soft Delete
          </button>
          
          <button onClick={handleRestore} className="bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200">
            Restore
          </button>
          
          <button onClick={handleDelete} className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200">
            Hard Delete
          </button>
        </div>

        {downloadError && <p className="text-red-600 mb-4">Download Error: {downloadError.message}</p>}

        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Preview & Details</h3>
          {isFileLoading && <p>Loading metadata...</p>}
          {!isFileLoading && metadata && (
            <div className="text-sm">
              <p><strong>Name:</strong> {metadata.originalName}</p>
              <p><strong>Bucket:</strong> {metadata.bucket}</p>
              <p><strong>Status:</strong> {metadata.status}</p>
              <p><strong>Visibility:</strong> {metadata.visibility}</p>
              <p><strong>Version:</strong> {metadata.version}</p>
              <p><strong>Size:</strong> {(metadata.size / 1024).toFixed(2)} KB</p>
              <p className="mb-4"><strong>Checksum:</strong> <span className="font-mono text-xs">{metadata.checksum}</span></p>

              {url && metadata.mimeType.startsWith('image/') && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Image Preview:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Preview" className="max-w-xs rounded border shadow-sm" />
                </div>
              )}
              {url && metadata.mimeType.startsWith('video/') && (
                <div className="mt-4">
                  <p className="font-semibold mb-2">Video Preview:</p>
                  <video src={url} controls className="max-w-md rounded border shadow-sm" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
