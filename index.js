const { applyMagic } = require("js-magic");
const target = Symbol("target");
const properties = Symbol("properties");
const expanded = Symbol("expanded");

class DontStopProxy {
    constructor(name, _target) {
        this.name = name;
        this[target] = _target;
        this[properties] = {};
        this[expanded] = true;
    }

    __get(prop) {
        if (this[target] && prop in this[target]) {
            if (typeof this[target] == "function") {
                if (prop == "toString") {
                    return Function.prototype.toString.bind(this[target]);
                } else if (prop == "name") {
                    return this[target].name || this.name;
                }
            }

            return this[target][prop];
        } else if (prop in this) {
            return this[prop];
        } else if (prop in this[properties]) {
            return this[properties][prop];
        } else if (typeof prop != "symbol") {
            this[properties][prop] = new this.constructor(
                (this.name && `${this.name}.`) + String(prop),
                void 0
            );
            return this[properties][prop];
        }
    }

    __set(prop, value) {
        if (prop in this) {
            return;
        } else if (this[target] && prop in this[target]) {
            this[target][prop] = value;
        } else if (typeof value == "function") {
            Object.defineProperty(value, "name", {
                configurable: true,
                enumerable: false,
                writable: false,
                value: (this.name ? `${this.name}.` : "") + (value.name || prop)
            });
            this[properties][prop] = value[expanded]
                ? value
                : dontStop(value, value.name);
        } else {
            this[properties][prop] = value;
        }
    }

    __has(prop) {
        return (prop in this) || (prop in this[properties]);
    }

    __delete(prop) {
        delete this[properties][prop];
    }
}

DontStopProxy = applyMagic(DontStopProxy);

function dontStop(target, name) {
    if (typeof target == "string") {
        name = target;
        target = null;
    }

    name = name || (target && target.name || "");

    let ins = new DontStopProxy(name, target);

    if (typeof target == "function") {
        return new Proxy(target, {
            get(_, prop) {
                return ins[prop];
            },
            set(_, prop, value) {
                ins[prop] = value;
                return true;
            },
            has(_, prop) {
                return prop in ins;
            },
            deleteProperty(_, prop) {
                delete ins[prop];
                return true;
            }
        });
    } else {
        return ins;
    }
}

exports.dontStop = exports.default = dontStop;