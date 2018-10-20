const assert = require("assert");
const dontStop = require(".").default;

describe("dontStop object", () => {
    it("should stretch as expected", () => {
        var obj = dontStop("obj");

        obj.div = (a, b) => a / b;
        obj.div.times = (a, b) => a * b;
        obj.hello.world = "Hello, World!";

        assert.equal(typeof obj, "object");
        console.log(obj.name);
        assert.equal(obj.name, "obj");
        assert.equal(obj.div.name, "obj.div");
        assert.equal(obj.div.times.name, "obj.div.times");
        assert.equal(obj.hello.name, "obj.hello");
        assert.equal(obj.hello.world, "Hello, World!");
        assert.strictEqual(obj.div.length, 2);
        assert.strictEqual(obj.div.times.length, 2);
        assert.strictEqual(obj.div(12, 4), 3);
        assert.strictEqual(obj.div.times(3, 4), 12);
    });

    it("should stretch an object as expected", () => {
        var obj = dontStop({ key: "note" }, "obj");

        obj.div = (a, b) => a / b;
        obj.div.times = (a, b) => a * b;
        obj.hello.world = "Hello, World!";

        assert.equal(typeof obj, "object");
        assert.equal(obj.key, "note");
        assert.equal(obj.name, "obj");
        assert.equal(obj.div.name, "obj.div");
        assert.equal(obj.div.times.name, "obj.div.times");
        assert.equal(obj.hello.name, "obj.hello");
        assert.equal(obj.hello.world, "Hello, World!");
        assert.strictEqual(obj.div.length, 2);
        assert.strictEqual(obj.div.times.length, 2);
        assert.strictEqual(obj.div(12, 4), 3);
        assert.strictEqual(obj.div.times(3, 4), 12);
    });
});

describe("dontStop function", () => {
    it("should stretch a named function as expected", () => {
        var sum = dontStop(function sum(a, b) {
            return a + b;
        });
        sum.div = (a, b) => a / b;
        sum.div.times = (a, b) => a * b;
        sum.hello.world = "Hello, World!";

        assert.equal(typeof sum, "function");
        assert.equal(sum.name, "sum");
        assert.equal(sum.div.name, "sum.div");
        assert.equal(sum.div.times.name, "sum.div.times");
        assert.equal(sum.hello.name, "sum.hello");
        assert.equal(sum.hello.world, "Hello, World!");
        assert.strictEqual(sum.length, 2);
        assert.strictEqual(sum.div.length, 2);
        assert.strictEqual(sum.div.times.length, 2);
        assert.strictEqual(sum(12, 13), 25);
        assert.strictEqual(sum.div(12, 4), 3);
        assert.strictEqual(sum.div.times(3, 4), 12);
        assert.equal(sum.toString(), `function sum(a, b) {
            return a + b;
        }`);
        assert.equal(sum.div.toString(), "(a, b) => a / b");
        assert.equal(sum.div.times.toString(), "(a, b) => a * b");
    });

    it("should stretch an anonymous function as expected", () => {
        var sum = dontStop((a, b) => {
            return a + b;
        }, "sum");
        sum.div = (a, b) => a / b;
        sum.div.times = (a, b) => a * b;
        sum.hello.world = "Hello, World!";

        assert.equal(typeof sum, "function");
        assert.equal(sum.name, "sum");
        assert.equal(sum.div.name, "sum.div");
        assert.equal(sum.div.times.name, "sum.div.times");
        assert.equal(sum.hello.name, "sum.hello");
        assert.equal(sum.hello.world, "Hello, World!");
        assert.strictEqual(sum.length, 2);
        assert.strictEqual(sum.div.length, 2);
        assert.strictEqual(sum.div.times.length, 2);
        assert.strictEqual(sum(12, 13), 25);
        assert.strictEqual(sum.div(12, 4), 3);
        assert.strictEqual(sum.div.times(3, 4), 12);
    });
});
