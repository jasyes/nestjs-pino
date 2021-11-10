/* eslint-disable @typescript-eslint/ban-types */
import { hrtime } from 'process';
import { Injectable, Inject, Scope } from '@nestjs/common';
import * as pino from 'pino';
import { Params, PARAMS_PROVIDER_TOKEN } from './params';
import { LOGGER_STORAGE } from './storage';
import { getStorageObj, setStorageValues } from '.';

type PinoMethods = Pick<
  pino.BaseLogger,
  'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
>;

/**
 * This is copy of pino.LogFn but with possibilty to make method override.
 * Current usage works:
 *
 *  trace(msg: string, ...args: any[]): void;
 *  trace(obj: object, msg?: string, ...args: any[]): void;
 *  trace(...args: Parameters<LoggerFn>) {
 *    this.call('trace', ...args);
 *  }
 *
 * But if change local LoggerFn to pino.LogFn – this will say that overrides
 * are incompatible
 */
type LoggerFn =
  | ((msg: string, ...args: any[]) => void)
  | ((obj: object, msg?: string, ...args: any[]) => void);

export function __resetOutOfContextForTests() {
  // @ts-ignore reset root for tests only
  PinoLogger.root = undefined;
}

@Injectable({ scope: Scope.TRANSIENT })
export class PinoLogger implements PinoMethods {
  private logger: pino.Logger;

  private context = '';
  private readonly contextName: string;

  constructor(@Inject(PARAMS_PROVIDER_TOKEN) { pino, renameContext }: Params) {
    this.contextName = renameContext || 'context';
    this.logger = pino;
  }

  trace(msg: string, ...args: any[]): void;
  trace(obj: object, msg?: string, ...args: any[]): void;
  trace(...args: Parameters<LoggerFn>) {
    this.call('trace', ...args);
  }

  debug(msg: string, ...args: any[]): void;
  debug(obj: object, msg?: string, ...args: any[]): void;
  debug(...args: Parameters<LoggerFn>) {
    this.call('debug', ...args);
  }

  info(msg: string, ...args: any[]): void;
  info(obj: object, msg?: string, ...args: any[]): void;
  info(...args: Parameters<LoggerFn>) {
    this.call('info', ...args);
  }

  warn(msg: string, ...args: any[]): void;
  warn(obj: object, msg?: string, ...args: any[]): void;
  warn(...args: Parameters<LoggerFn>) {
    this.call('warn', ...args);
  }

  error(msg: string, ...args: any[]): void;
  error(obj: object, msg?: string, ...args: any[]): void;
  error(...args: Parameters<LoggerFn>) {
    this.call('error', ...args);
  }

  fatal(msg: string, ...args: any[]): void;
  fatal(obj: object, msg?: string, ...args: any[]): void;
  fatal(...args: Parameters<LoggerFn>) {
    this.call('fatal', ...args);
  }

  setContext(value: string) {
    this.context = value;
  }

  private call(method: pino.Level, ...args: Parameters<LoggerFn>) {
    const context = getStorageObj();
    if (this.context) {
      if (isFirstArgObject(args)) {
        const firstArg = args[0];
        if (firstArg instanceof Error) {
          args = [
            Object.assign(
              { [this.contextName]: this.context, ...context },
              { err: firstArg },
            ),
            ...args.slice(1),
          ];
        } else {
          args = [
            Object.assign(
              { [this.contextName]: this.context, ...context },
              firstArg,
            ),
            ...args.slice(1),
          ];
        }
      } else {
        args = [{ [this.contextName]: this.context, ...context }, ...args];
      }
    } else if (context) {
      args = [context, ...args];
    }
    // @ts-ignore args are union of tuple types
    this.logger[method](...args);
  }

  public assign(fields: Record<string, any>) {
    setStorageValues(fields);
  }

  public startTime(): bigint {
    return hrtime.bigint();
  }

  public endTimeInMs(startTime: bigint): number {
    return Number(hrtime.bigint() - startTime) / 1000000;
  }
}

function isFirstArgObject(
  args: Parameters<LoggerFn>,
): args is [obj: object, msg?: string, ...args: any[]] {
  return typeof args[0] === 'object';
}
