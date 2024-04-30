class Swapper {
    // features
    static obj(a, b) {
        let tmp = new Object;
        Object.assign(tmp, a);
        Swapper.clean(a);
        Object.assign(a, b);
        Swapper.clean(b);
        Object.assign(b, tmp);
    }
    static elem(obj, prop1, prop2) {
        if (typeof obj !== 'object')
            throw "First argument must be an object!";
        if (typeof prop2 === 'undefined') {
            [prop1, prop2] = Swapper.parseNames(prop1 + ' ' + prop2);
        }
        let tmp = obj[prop1];
        obj[prop1] = obj[prop2];
        obj[prop2] = tmp;
    }
    // helpers
    static clean(obj) {
        for (let member in obj)
            delete obj[member];
        Array.isArray(obj) && (obj.length = 0);
    }
    static parseNames(names) {
        let regexp = /[\s\t,;]+/;
        return names.split(regexp);
    }
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Swapper;
}
//# sourceMappingURL=swapper.js.map