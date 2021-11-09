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
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
const PinoLogger_1 = require("./PinoLogger");
const params_1 = require("./params");
let Logger = class Logger {
    constructor(logger, { renameContext }) {
        this.logger = logger;
        this.contextName = renameContext || 'context';
    }
    verbose(message, ...optionalParams) {
        this.call('trace', message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        this.call('debug', message, ...optionalParams);
    }
    log(message, ...optionalParams) {
        this.call('info', message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        this.call('warn', message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.call('error', message, ...optionalParams);
    }
    call(level, message, ...optionalParams) {
        const objArg = {};
        // optionalParams contains extra params passed to logger
        // context name is the last item
        let params = [];
        if (optionalParams.length !== 0) {
            objArg[this.contextName] = optionalParams[optionalParams.length - 1];
            params = optionalParams.slice(0, -1);
        }
        if (typeof message === 'object') {
            if (message instanceof Error) {
                objArg.err = message;
            }
            else {
                Object.assign(objArg, message);
            }
            this.logger[level](objArg, ...params);
        }
        else {
            this.logger[level](objArg, message, ...params);
        }
    }
};
Logger = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(params_1.PARAMS_PROVIDER_TOKEN)),
    __metadata("design:paramtypes", [PinoLogger_1.PinoLogger, Object])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map