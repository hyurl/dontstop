# Don't Stop

**A funny tool to call on an object via a semantic chain of unlimited depth.**

## Example

```javascript
const dontStop = require("dontStop").default;

const I = dontStop("I");

I.am.student = true;
I.am.developer = true;
I.want.to.be.a.scientist = () => { // 
    // plan to be a scientist
};
I.want.money = () => {
    // how to get money
};
I.want.health = () => {
    // how to get health
};
I.have.hair = true;
I.have.job = true;
I.have.lunch = () => {
    // how do I have lunch
};
I.have.lunch.at.where = "company dining room";
I.have.lunch.at.when = "12:00"; 
I.have.assets = {
    computer: 1,
    laptop: 1,
    cup: 4,
    bag: 1,
    // ...
}

// check the 'name' property
console.log(I.have.name); // => 'I.have' (because it's auto-generated object)
console.log(I.have.hair.name); // => undefined (because it's a user-defined value)
console.log(I.have.lunch.name) // => 'I.have.lunch' (bacause it's assigned function)
console.log(I.have.assets.name) // => undefined (because it's a user-defined value)
```

## API

- `dontStop(name: string): DontStopProxy`
- `dontStop<T extends Function>(target: T, name?: string): T & DontStopProxy`
- `dontStop<T = object>(target: T, name: string): T & DontStopProxy`
    This function returns an object (or a function when `target` is a function) 
    that implements the interface `DontStopProxy`, which allows you, for 
    semantic purpose, chaining properties with unlimited depth, even they hasn't
    been defined.
    - `name` Sets the top level name of the chain, used for prefixing property 
        names. When passing `target` a named function or an object with `name` 
        property, this argument is not necessary.
- `DontStopProxy.name` This readonly property returns the name of the current 
    reference property (only if the property is set function, or is 
    auto-generated).
- `DontStopProxy.someProp = someFunction` If you assign a function to a 
    property, which is not original set in `target`, the function will be 
    automatically wrapped by `dontStop` as `DontStopProxy`, so that it both can 
    be invoked and be chained.