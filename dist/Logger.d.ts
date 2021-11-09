import { LoggerService } from '@nestjs/common';
import { PinoLogger } from './PinoLogger';
import { Params } from './params';
export declare class Logger implements LoggerService {
    protected readonly logger: PinoLogger;
    private readonly contextName;
    constructor(logger: PinoLogger, { renameContext }: Params);
    verbose(message: any, ...optionalParams: any[]): void;
    debug(message: any, ...optionalParams: any[]): void;
    log(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    private call;
}
