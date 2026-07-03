import { BaseRepository } from './BaseRepository';
import { Database } from '../../../types/database.types';
import { IStorageRepository } from './storage.interface';
import { FileMetadata, StorageBucket, StorageError } from '../../../types/storage';
import { Result } from '../../../types/result';
import { SupabaseClient } from '@supabase/supabase-js';

type FileMetadataRow = Database['public']['Tables']['file_metadata']['Row'];

export class SupabaseStorageRepository 
  extends BaseRepository<FileMetadata, 'file_metadata'> 
  implements IStorageRepository 
{
  constructor(client: SupabaseClient<Database>) {
    super(client, 'file_metadata');
  }

  protected mapRowToModel(row: FileMetadataRow): FileMetadata {
    return {
      id: row.id,
      bucket: row.bucket,
      path: row.path,
      originalName: row.original_name,
      storedName: row.stored_name,
      mimeType: row.mime_type,
      extension: row.extension,
      size: row.size,
      checksum: row.checksum,
      uploadedBy: row.uploaded_by,
      teamId: row.team_id || undefined,
      submissionId: row.submission_id || undefined,
      visibility: row.visibility as 'PUBLIC' | 'PRIVATE',
      status: row.status as 'ACTIVE' | 'DELETED' | 'ARCHIVED',
      version: row.version,
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.updated_at || new Date().toISOString(),
    };
  }

  async uploadFile(
    file: File,
    bucket: StorageBucket,
    path: string,
    metadata: Omit<FileMetadata, 'id' | 'createdAt' | 'updatedAt' | 'version'>
  ): Promise<Result<FileMetadata>> {
    try {
      const { error: storageError } = await this.supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: false });

      if (storageError) {
        return { success: false, error: new StorageError(storageError.message, 'UPLOAD_FAILED', true, storageError) };
      }

      const { data: dbData, error: dbError } = await this.supabase
        .from('file_metadata')
        .insert({
          bucket: metadata.bucket,
          path: metadata.path,
          original_name: metadata.originalName,
          stored_name: metadata.storedName,
          mime_type: metadata.mimeType,
          extension: metadata.extension,
          size: metadata.size,
          checksum: metadata.checksum,
          uploaded_by: metadata.uploadedBy,
          team_id: metadata.teamId || null,
          submission_id: metadata.submissionId || null,
          visibility: metadata.visibility,
          status: metadata.status,
          version: 1
        })
        .select()
        .single();

      if (dbError) {
        // Rollback storage upload
        await this.supabase.storage.from(bucket).remove([path]);
        return { success: false, error: new StorageError(dbError.message, 'UPLOAD_FAILED', false, dbError) };
      }

      return { success: true, data: this.mapRowToModel(dbData) };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected upload error', 'UPLOAD_FAILED', false, error) };
    }
  }

  async replaceFile(
    id: string,
    file: File,
    metadataUpdates: Partial<Omit<FileMetadata, 'id' | 'createdAt' | 'updatedAt' | 'version'>>
  ): Promise<Result<FileMetadata>> {
    try {
      const { data: currentFile, error: fetchError } = await this.supabase
        .from('file_metadata')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !currentFile) {
        return { success: false, error: new StorageError('File metadata not found', 'NOT_FOUND') };
      }

      const { error: storageError } = await this.supabase.storage
        .from(currentFile.bucket)
        .upload(currentFile.path, file, { upsert: true });

      if (storageError) {
        return { success: false, error: new StorageError(storageError.message, 'UPLOAD_FAILED', true, storageError) };
      }

      const newVersion = currentFile.version + 1;
      
      const { data: dbData, error: dbError } = await this.supabase
        .from('file_metadata')
        .update({
          original_name: metadataUpdates.originalName ?? currentFile.original_name,
          stored_name: metadataUpdates.storedName ?? currentFile.stored_name,
          mime_type: metadataUpdates.mimeType ?? currentFile.mime_type,
          extension: metadataUpdates.extension ?? currentFile.extension,
          size: metadataUpdates.size ?? currentFile.size,
          checksum: metadataUpdates.checksum ?? currentFile.checksum,
          visibility: metadataUpdates.visibility ?? currentFile.visibility,
          status: metadataUpdates.status ?? currentFile.status,
          version: newVersion,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (dbError) {
        return { success: false, error: new StorageError(dbError.message, 'UPLOAD_FAILED', false, dbError) };
      }

      return { success: true, data: this.mapRowToModel(dbData) };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected replace error', 'UPLOAD_FAILED', false, error) };
    }
  }

  async deleteFile(id: string): Promise<Result<void>> {
    try {
      const { data: currentFile, error: fetchError } = await this.supabase
        .from('file_metadata')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !currentFile) {
        return { success: false, error: new StorageError('File metadata not found', 'NOT_FOUND') };
      }

      const { error: storageError } = await this.supabase.storage
        .from(currentFile.bucket)
        .remove([currentFile.path]);

      if (storageError) {
        return { success: false, error: new StorageError(storageError.message, 'DELETE_FAILED', false, storageError) };
      }

      const { error: dbError } = await this.supabase
        .from('file_metadata')
        .delete()
        .eq('id', id);

      if (dbError) {
        return { success: false, error: new StorageError(dbError.message, 'DELETE_FAILED', false, dbError) };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected delete error', 'DELETE_FAILED', false, error) };
    }
  }

  async softDeleteFile(id: string): Promise<Result<void>> {
    try {
      const { error } = await this.supabase
        .from('file_metadata')
        .update({ status: 'DELETED', updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        return { success: false, error: new StorageError(error.message, 'DELETE_FAILED', false, error) };
      }

      return { success: true, data: undefined };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected soft delete error', 'DELETE_FAILED', false, error) };
    }
  }

  async restoreFile(id: string): Promise<Result<FileMetadata>> {
    try {
      const { data, error } = await this.supabase
        .from('file_metadata')
        .update({ status: 'ACTIVE', updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { success: false, error: new StorageError(error.message, 'UPLOAD_FAILED', false, error) };
      }

      return { success: true, data: this.mapRowToModel(data) };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected restore error', 'UPLOAD_FAILED', false, error) };
    }
  }

  async getFileMetadata(id: string): Promise<Result<FileMetadata>> {
    try {
      const { data, error } = await this.supabase
        .from('file_metadata')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        return { success: false, error: new StorageError(error.message, 'NOT_FOUND', false, error) };
      }
      return { success: true, data: this.mapRowToModel(data) };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected error', 'NOT_FOUND', false, error) };
    }
  }

  async listMetadata(filters: Partial<FileMetadata>): Promise<Result<FileMetadata[]>> {
    try {
      let query = this.supabase.from('file_metadata').select('*');

      if (filters.bucket) query = query.eq('bucket', filters.bucket);
      if (filters.teamId) query = query.eq('team_id', filters.teamId);
      if (filters.submissionId) query = query.eq('submission_id', filters.submissionId);
      if (filters.uploadedBy) query = query.eq('uploaded_by', filters.uploadedBy);
      if (filters.status) query = query.eq('status', filters.status);

      const { data, error } = await query;

      if (error) {
        return { success: false, error: new StorageError(error.message, 'INVALID_FILE', false, error) };
      }

      return { success: true, data: data.map(row => this.mapRowToModel(row)) };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected list error', 'INVALID_FILE', false, error) };
    }
  }

  async getSignedUrl(id: string, expiresIn: number): Promise<Result<string>> {
    try {
      const { data: currentFile, error: fetchError } = await this.supabase
        .from('file_metadata')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !currentFile) {
        return { success: false, error: new StorageError('File metadata not found', 'NOT_FOUND') };
      }

      const { data, error } = await this.supabase.storage
        .from(currentFile.bucket)
        .createSignedUrl(currentFile.path, expiresIn);

      if (error || !data) {
        return { success: false, error: new StorageError(error?.message || 'Failed to create signed URL', 'SIGNED_URL_FAILED', false, error) };
      }

      return { success: true, data: data.signedUrl };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected signed URL error', 'SIGNED_URL_FAILED', false, error) };
    }
  }

  async getPublicUrl(id: string): Promise<Result<string>> {
    try {
      const { data: currentFile, error: fetchError } = await this.supabase
        .from('file_metadata')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !currentFile) {
        return { success: false, error: new StorageError('File metadata not found', 'NOT_FOUND') };
      }

      const { data } = this.supabase.storage
        .from(currentFile.bucket)
        .getPublicUrl(currentFile.path);

      return { success: true, data: data.publicUrl };
    } catch (error) {
      return { success: false, error: new StorageError('Unexpected public URL error', 'INVALID_FILE', false, error) };
    }
  }
}
