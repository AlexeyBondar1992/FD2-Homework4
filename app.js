'use strict';
function asyncMap(arr, fn) {
    let promise = Promise.resolve(),
        result = [];
    arr.forEach(function (v, i, a) {
        promise = promise.then(function () {
            return fn(v, i, a);
        }).then(function (el) {
            result.push(el);
        });
    });
    return promise.then(() => result);
}
function asyncMap1(arr, fn) {
    return Promise.all(arr.map(function (v, i, a) {
        return fn(v, i, a);
    }));
}


var btns = document.querySelectorAll('button'),
    buttonsArray = Array.prototype.slice.call(btns);

asyncMap(buttonsArray, function (el, i, a) {
    return elementClick(el).then(el=> {
        return Date.now();
    });
}).then(function (arr) {
    console.log(arr)
});
function elementClick(el) {
    return new Promise(function (resolve) {
        el.addEventListener('click', function listener() {
            el.removeEventListener('click', listener);
            resolve(el)
        });
    });
}
