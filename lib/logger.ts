type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private format(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    return `[KODESEC] [${level.toUpperCase()}] [${timestamp}] - ${message}`;
  }

  info(message: string, ...args: unknown[]) {
    console.info(this.format("info", message), ...args);
  }

  warn(message: string, ...args: unknown[]) {
    console.warn(this.format("warn", message), ...args);
  }

  error(message: string, ...args: unknown[]) {
    console.error(this.format("error", message), ...args);
  }

  debug(message: string, ...args: unknown[]) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.format("debug", message), ...args);
    }
  }
}

export const logger = new Logger();
