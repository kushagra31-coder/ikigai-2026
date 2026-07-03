export class RepositoryError extends Error {
  public code: string;
  public details?: unknown;
  public retryable: boolean;
  public source: string;

  constructor(message: string, code: string, source: string, retryable: boolean = false, details?: unknown) {
    super(message);
    this.name = 'RepositoryError';
    this.code = code;
    this.source = source;
    this.retryable = retryable;
    this.details = details;
  }
}

export type Result<T> = 
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: RepositoryError };
