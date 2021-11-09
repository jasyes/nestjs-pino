import * as pino from 'pino';
import { ModuleMetadata } from '@nestjs/common/interfaces';
export declare type PassedLogger = {
    logger: pino.Logger;
};
export interface Params {
    pino: pino.Logger;
    /**
     * Optional parameter to change property name `context` in resulted logs,
     * so logs will be like:
     * {"level":30, ... "RENAME_CONTEXT_VALUE_HERE":"AppController" }
     */
    renameContext?: string;
}
export interface LoggerModuleAsyncParams extends Pick<ModuleMetadata, 'imports' | 'providers'> {
    useFactory: (...args: any[]) => Params | Promise<Params>;
    inject?: any[];
}
export declare function isPassedLogger(pinoHttpProp: any): pinoHttpProp is PassedLogger;
export declare const PARAMS_PROVIDER_TOKEN = "pino-params";
