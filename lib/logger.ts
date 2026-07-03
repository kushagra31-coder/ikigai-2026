type LogLevel = 'info' | 'warn' | 'error' | 'debug';
type LogCategory = 'Application' | 'Security' | 'Audit' | 'Realtime' | 'Storage';

interface LogPayload {
  category: LogCategory;
  message: string;
  data?: Record<string, unknown>;
  error?: Error | unknown;
}

class Logger {
  private log(level: LogLevel, payload: LogPayload) {
    const timestamp = new Date().toISOString();
    const isDev = process.env.NODE_ENV !== 'production';

    const logEntry = {
      timestamp,
      level,
      category: payload.category,
      message: payload.message,
      data: payload.data,
      error: payload.error instanceof Error ? { message: payload.error.message, stack: payload.error.stack } : payload.error,
    };

    if (isDev) {
      // Human readable in dev
      const prefix = `[${timestamp}] [${level.toUpperCase()}] [${payload.category}]`;
      if (level === 'error') {
        console.error(prefix, payload.message, payload.data || '', payload.error || '');
      } else {
        console.log(prefix, payload.message, payload.data || '');
      }
    } else {
      // JSON structured logging in production
      console.log(JSON.stringify(logEntry));
    }
  }

  info(payload: LogPayload) {
    this.log('info', payload);
  }

  warn(payload: LogPayload) {
    this.log('warn', payload);
  }

  error(payload: LogPayload) {
    this.log('error', payload);
  }

  debug(payload: LogPayload) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', payload);
    }
  }
}

export const logger = new Logger();
