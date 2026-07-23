'use client';

import { useState } from 'react';
import { Button } from '@/components/primitives/button';
import { Icons } from '@/components/constants/icons';
import Papa from 'papaparse';
import { useToast } from '@/components/providers/ToastProvider';
import { createBrowserClient } from '@supabase/ssr';

export default function BulkImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const { success, error } = useToast();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      Papa.parse(selected, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setPreview(results.data.slice(0, 5)); // Show first 5 rows
        }
      });
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) throw new Error('Not authenticated');

          const response = await fetch('/api/admin/import-teams', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({ teams: results.data })
          });

          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Import failed');
          }

          const resData = await response.json();
          success(`Successfully imported ${resData.teamsCreated} teams!`);
          setFile(null);
          setPreview([]);
        } catch (err: any) {
          error(err.message || 'An error occurred during import');
        } finally {
          setLoading(false);
        }
      },
      error: (err: any) => {
        error(err.message || 'Failed to parse CSV');
        setLoading(false);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Team Import</h1>
        <p className="text-muted-foreground mt-2">
          Upload the Unstop CSV export to auto-create teams, user accounts, and assign tracks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-card p-6">
          <h3 className="font-semibold mb-4">1. Upload CSV</h3>
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center bg-muted/20">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              id="csv-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
              <Icons.upload className="h-10 w-10 text-muted-foreground mb-4" />
              <span className="text-sm font-medium">Click to select CSV file</span>
              <span className="text-xs text-muted-foreground mt-1">Expected columns: name, email, team_name, track, role</span>
            </label>
          </div>
          {file && (
            <p className="text-sm mt-4 text-success font-medium">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">2. Review & Import</h3>
            <p className="text-sm text-muted-foreground">
              Importing will automatically provision Supabase Auth accounts for all unique emails found in the CSV. A password reset link will NOT be sent automatically to prevent spam.
            </p>
          </div>
          
          <Button 
            className="w-full mt-6" 
            onClick={handleImport}
            disabled={!file || loading}
          >
            {loading ? <Icons.spinner className="animate-spin mr-2 w-4 h-4" /> : <Icons.database className="mr-2 w-4 h-4" />}
            {loading ? 'Importing Teams...' : 'Start Import'}
          </Button>
        </div>
      </div>

      {preview.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold">Data Preview (First 5 Rows)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="px-6 py-3 font-medium">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {preview.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-6 py-3">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
