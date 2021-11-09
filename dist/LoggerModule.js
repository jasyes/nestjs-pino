"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const Logger_1 = require("./Logger");
const params_1 = require("./params");
const PinoLogger_1 = require("./PinoLogger");
const InjectPinoLogger_1 = require("./InjectPinoLogger");
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot(params) {
        const paramsProvider = {
            provide: params_1.PARAMS_PROVIDER_TOKEN,
            useValue: params,
        };
        const decorated = (0, InjectPinoLogger_1.createProvidersForDecorated)();
        return {
            module: LoggerModule_1,
            providers: [Logger_1.Logger, ...decorated, PinoLogger_1.PinoLogger, paramsProvider],
            exports: [Logger_1.Logger, ...decorated, PinoLogger_1.PinoLogger, paramsProvider],
        };
    }
    static forRootAsync(params) {
        const paramsProvider = {
            provide: params_1.PARAMS_PROVIDER_TOKEN,
            useFactory: params.useFactory,
            inject: params.inject,
        };
        const decorated = (0, InjectPinoLogger_1.createProvidersForDecorated)();
        const providers = [
            Logger_1.Logger,
            ...decorated,
            PinoLogger_1.PinoLogger,
            paramsProvider,
            ...(params.providers || []),
        ];
        return {
            module: LoggerModule_1,
            imports: params.imports,
            providers,
            exports: [Logger_1.Logger, ...decorated, PinoLogger_1.PinoLogger, paramsProvider],
        };
    }
};
LoggerModule = LoggerModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({ providers: [Logger_1.Logger], exports: [Logger_1.Logger] })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=LoggerModule.js.map