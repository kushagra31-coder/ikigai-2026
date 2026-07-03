import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../types/database.types';
import { Result, RepositoryError } from '../../../types/result';

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface SortParams {
  column: string;
  ascending?: boolean;
}

type PublicTables = Database['public']['Tables'];
type TableNames = keyof PublicTables;

export abstract class BaseRepository<Model, Table extends TableNames> {
  protected supabase: SupabaseClient<Database>;
  protected tableName: Table;

  constructor(supabase: SupabaseClient<Database>, tableName: Table) {
    this.supabase = supabase;
    this.tableName = tableName;
  }

  protected abstract mapRowToModel(row: PublicTables[Table]['Row']): Model;

  protected handleError(error: unknown, context: string): RepositoryError {
    const err = error as Record<string, unknown>;
    return new RepositoryError(
      typeof err?.message === 'string' ? err.message : 'An unknown error occurred',
      typeof err?.code === 'string' ? err.code : 'UNKNOWN_CODE',
      context,
      false,
      error
    );
  }

  protected async executeQuery<R>(query: PromiseLike<{ data: R | null; error: unknown }>, context: string): Promise<Result<R>> {
    try {
      const { data, error } = await query;
      if (error) {
        return { success: false, error: this.handleError(error, context) };
      }
      return { success: true, data: data as R };
    } catch (e: unknown) {
      return { success: false, error: this.handleError(e, context) };
    }
  }

  async getAll(): Promise<Result<Model[]>> {
    const query = this.supabase.from(this.tableName).select('*') as unknown as PromiseLike<{ data: PublicTables[Table]['Row'][] | null; error: unknown }>;
    const result = await this.executeQuery<PublicTables[Table]['Row'][]>(query, `${this.tableName}.getAll`);
    if (!result.success) return result;
    return { success: true, data: result.data.map(row => this.mapRowToModel(row)) };
  }

  async getById(id: string): Promise<Result<Model>> {
    const q = this.supabase.from(this.tableName).select('*') as unknown as { eq: (col: string, val: string) => { single: () => PromiseLike<{ data: PublicTables[Table]['Row'] | null; error: unknown }> } };
    const query = q.eq('id', id).single();
    const result = await this.executeQuery<PublicTables[Table]['Row']>(query, `${this.tableName}.getById`);
    if (!result.success) return result;
    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async create(payload: PublicTables[Table]['Insert']): Promise<Result<Model>> {
    const query = this.supabase.from(this.tableName).insert(payload as never).select().single() as unknown as PromiseLike<{ data: PublicTables[Table]['Row'] | null; error: unknown }>;
    const result = await this.executeQuery<PublicTables[Table]['Row']>(query, `${this.tableName}.create`);
    if (!result.success) return result;
    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async update(id: string, payload: PublicTables[Table]['Update']): Promise<Result<Model>> {
    const q = this.supabase.from(this.tableName).update(payload as never) as unknown as { eq: (col: string, val: string) => { select: () => { single: () => PromiseLike<{ data: PublicTables[Table]['Row'] | null; error: unknown }> } } };
    const query = q.eq('id', id).select().single();
    const result = await this.executeQuery<PublicTables[Table]['Row']>(query, `${this.tableName}.update`);
    if (!result.success) return result;
    return { success: true, data: this.mapRowToModel(result.data) };
  }

  async delete(id: string): Promise<Result<void>> {
    const q = this.supabase.from(this.tableName).delete() as unknown as { eq: (col: string, val: string) => PromiseLike<{ data: void | null; error: unknown }> };
    return this.executeQuery<void>(
      q.eq('id', id),
      `${this.tableName}.delete`
    );
  }
}
