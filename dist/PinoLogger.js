"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinoLogger = exports.__resetOutOfContextForTests = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const common_1 = require("@nestjs/common");
const params_1 = require("./params");
const _1 = require(".");
function __resetOutOfContextForTests() {
    // @ts-ignore reset root for tests only
    PinoLogger.root = undefined;
}
exports.__resetOutOfContextForTests = __resetOutOfContextForTests;
let PinoLogger = class PinoLogger {
    constructor({ pino, renameContext }) {
        this.context = '';
        this.contextName = renameContext || 'context';
        this.logger = pino;
    }
    trace(...args) {
        this.call('trace', ...args);
    }
    debug(...args) {
        this.call('debug', ...args);
    }
    info(...args) {
        this.call('info', ...args);
    }
    warn(...args) {
        this.call('warn', ...args);
    }
    error(...args) {
        this.call('error', ...args);
    }
    fatal(...args) {
        this.call('fatal', ...args);
    }
    setContext(value) {
        this.context = value;
    }
    call(method, ...args) {
        const context = (0, _1.getStorageObj)();
        if (this.context) {
            if (isFirstArgObject(args)) {
                const firstArg = args[0];
                if (firstArg instanceof Error) {
                    args = [
                        Object.assign({ [this.contextName]: this.context, ...context }, { err: firstArg }),
                        ...args.slice(1),
                    ];
                }
                else {
                    args = [
                        Object.assign({ [this.contextName]: this.context, ...context }, firstArg),
                        ...args.slice(1),
                    ];
                }
            }
            else {
                args = [{ [this.contextName]: this.context, ...context }, ...args];
            }
        }
        // @ts-ignore args are union of tuple types
        this.logger[method](...args);
    }
    assign(fields) {
        (0, _1.setStorageValues)(fields);
    }
};
PinoLogger = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(params_1.PARAMS_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [Object])
], PinoLogger);
exports.PinoLogger = PinoLogger;
function isFirstArgObject(args) {
    return typeof args[0] === 'object';
}
//# sourceMappingURL=PinoLogger.js.map