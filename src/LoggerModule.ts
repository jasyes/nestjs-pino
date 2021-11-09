import { Global, Module, DynamicModule } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces';
import { Logger } from './Logger';
import {
  Params,
  LoggerModuleAsyncParams,
  PARAMS_PROVIDER_TOKEN,
} from './params';
import { PinoLogger } from './PinoLogger';
import { createProvidersForDecorated } from './InjectPinoLogger';
@Global()
@Module({ providers: [Logger], exports: [Logger] })
export class LoggerModule {
  static forRoot(params: Params): DynamicModule {
    const paramsProvider: Provider<Params> = {
      provide: PARAMS_PROVIDER_TOKEN,
      useValue: params,
    };

    const decorated = createProvidersForDecorated();

    return {
      module: LoggerModule,
      providers: [Logger, ...decorated, PinoLogger, paramsProvider],
      exports: [Logger, ...decorated, PinoLogger, paramsProvider],
    };
  }

  static forRootAsync(params: LoggerModuleAsyncParams): DynamicModule {
    const paramsProvider: Provider<Params | Promise<Params>> = {
      provide: PARAMS_PROVIDER_TOKEN,
      useFactory: params.useFactory,
      inject: params.inject,
    };

    const decorated = createProvidersForDecorated();

    const providers: any[] = [
      Logger,
      ...decorated,
      PinoLogger,
      paramsProvider,
      ...(params.providers || []),
    ];

    return {
      module: LoggerModule,
      imports: params.imports,
      providers,
      exports: [Logger, ...decorated, PinoLogger, paramsProvider],
    };
  }
}
