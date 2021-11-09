import * as pinoHttp from 'pino-http';
import * as pino from 'pino';
import { DestinationStream } from 'pino';
import {
  MiddlewareConfigProxy,
  ModuleMetadata,
} from '@nestjs/common/interfaces';

export type PassedLogger = { logger: pino.Logger };

export interface Params {
  pino: pino.Logger;

  /**
   * Optional parameter to change property name `context` in resulted logs,
   * so logs will be like:
   * {"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" }
   */
  renameContext?: string;
}

export interface LoggerModuleAsyncParams
  extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => Params | Promise<Params>;
  inject?: any[];
}

export function isPassedLogger(
  pinoHttpProp: any,
): pinoHttpProp is PassedLogger {
  return !!pinoHttpProp && 'logger' in pinoHttpProp;
}

export const PARAMS_PROVIDER_TOKEN = 'pino-params';
