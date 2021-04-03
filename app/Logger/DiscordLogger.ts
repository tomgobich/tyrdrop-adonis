import DiscordLogger from 'node-discord-logger';
import Env from '@ioc:Adonis/Core/Env';

const logger = new DiscordLogger({
  hook: Env.get('DISCORD_WEBHOOK'),
  serviceName: Env.get('NODE_ENV'), // optional, will be included as text in the footer
  defaultMeta: {                    // optional, will be added to all the messages
    'Process ID': process.pid
  },
  errorHandler: err => {            // optional, if you don't want this library to log to console
    console.error('error from discord', err);
  }
});

interface LogMessage {
  /** Message content */
  message: string;
  /** Message description */
  description?: string;
  /** Error object if any */
  error?: Error;
  /** Additional JSON data for the message */
  json?: any;
  /** Additional meta data for the message */
  meta?: {
    [key: string]: string | number | Date;
  };
}

class Logger {
  public static async info(title: string, message?: string | object | Array<any>): Promise<void> {
    return logger.info(this.build(title, message));
  }

  public static async warn(title: string, message?: string | object | Array<any>): Promise<void> {
    return logger.warn(this.build(title, message));
  }

  public static async error(title: string, message?: string | object | Array<any>): Promise<void> {
    return logger.error(this.build(title, message));
  }

  public static async debug(title: string, message?: string | object | Array<any>): Promise<void> {
    return logger.debug(this.build(title, message));
  }

  public static async silly(title: string, message?: string | object | Array<any>): Promise<void> {
    return logger.silly(this.build(title, message));
  }

  private static build(title: string, message?: string | object | Array<any>): LogMessage {
    return {
      message: title,
      description: JSON.stringify(message, null, 4)
    }
  }
}

export default Logger;