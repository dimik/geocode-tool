/*
var mocha = require('mocha');
var should = require('should');
*/

var MinHeap = require('..');
var heap = new MinHeap(function(a, b) {
    return a.birthyear - b.birthyear;
});

heap.add({
    name: 'John',
    birthyear: 1981
});
heap.add({
    name: 'Pavlo',
    birthyear: 2000
});
heap.add({
    name: 'Garry',
    birthyear: 1989
});
heap.add({
    name: 'Derek',
    birthyear: 1990
});
heap.add({
    name: 'Ivan',
    birthyear: 1966
});

console.log(heap.getCollection().last());

console.log(heap.extractMin()); // { name: 'Pavlo', birthyear: 2000 }
console.log(heap.extractMin()); // { name: 'Derek', birthyear: 1990 }
console.log(heap.extractMin()); // { name: 'Garry', birthyear: 1989 }
console.log(heap.extractMin()); // { name: 'John', birthyear: 1981 }
console.log(heap.extractMin()); // { name: 'Ivan', birthyear: 1966 }
