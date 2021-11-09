import { DynamicModule } from '@nestjs/common';
import { Params, LoggerModuleAsyncParams } from './params';
export declare class LoggerModule {
    static forRoot(params: Params): DynamicModule;
    static forRootAsync(params: LoggerModuleAsyncParams): DynamicModule;
}
