/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
import { FastifyReply, FastifyRequest } from 'fastify';
export declare type Store = Map<string, string | number | any>;
export declare const LOGGER_STORAGE: AsyncLocalStorage<Store>;
export declare const getStorageObj: () => undefined | any;
export declare const setStorageValues: (values: Record<string, any>) => void;
export declare const PinoFastifyHook: (req: FastifyRequest, res: FastifyReply, done: () => void) => void;
