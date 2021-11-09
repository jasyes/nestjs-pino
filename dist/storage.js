"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStorageValues = exports.getStorageObj = exports.LOGGER_STORAGE = void 0;
const async_hooks_1 = require("async_hooks");
exports.LOGGER_STORAGE = new async_hooks_1.AsyncLocalStorage();
const getStorageObj = () => {
    const store = exports.LOGGER_STORAGE.getStore();
    if (!store) {
        return;
    }
    const obj = {};
    for (const [key, value] of store.entries()) {
        obj[key] = value;
    }
    return obj;
};
exports.getStorageObj = getStorageObj;
const setStorageValues = (values) => {
    const store = exports.LOGGER_STORAGE.getStore();
    if (!store) {
        throw new Error('Storage context is not initialized');
    }
    for (const key of Object.keys(values)) {
        store.set(key, values[key]);
    }
};
exports.setStorageValues = setStorageValues;
//# sourceMappingURL=storage.js.map