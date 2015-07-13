var Collection = require('../collection');

/**
 * Minimum heap.
 *
 * @public
 * @constructor
 * @param {Function} cmp Function used for comparison between the elements.
 */
function Heap(cmp) {
  this._data = new Collection();
  this._cmp = typeof cmp === 'function'? cmp :
    function (a, b) { return a - b; };
}

Heap.prototype.heapify = function (index) {
  var data = this._data;
  var size = data.length;
  var cur = index;
  var left = 2 * index + 1;
  var right = 2 * index + 2;
  var val = data.get(index);

  if(left < size && this._cmp(data.get(left), val) > 0) {
    cur = left;
  }
  if(right < size && this._cmp(data.get(right), val) > 0) {
    cur = right;
  }
  if(index !== cur) {
    data.set(index, data.get(cur));
    data.set(cur, val);
    this.heapify(cur);
  }
};

Heap.prototype.changeKey = function (index, val) {
  var data = this._data;

  data.set(index, val);
  var parentIndex = this.getParentIndex(index);
  var parent = data.get(parentIndex);

  while(parentIndex >= 0 && this._cmp(val, parent) > 0) {
    data.set(parentIndex, val);
    data.set(index, parent);
    index = parentIndex;
    parentIndex = this.getParentIndex(parentIndex);
    parent = data.get(parentIndex);
  }

  return parent;
};

Heap.prototype.getParentIndex = function (index) {
  return Math.floor(index / 2);
};

Heap.prototype.update = function (val) {
  var index = this._data.indexOf(val);

  if(index >= 0) {
    this.changeKey(index, val);
  }
};

Heap.prototype.add = function (val) {
  var data = this._data;

  data.push(val);

  return this.changeKey(data.length - 1, val);
};

Heap.prototype.getMin = function () {
  return this._data.first();
};

Heap.prototype.extractMin = function () {
  if(this.isEmpty()) {
    return;
  }

  var result = this._data.shift();
  this.heapify(0);

  return result;
};

Heap.prototype.getCollection = function () {
  return this._data;
};

Heap.prototype.isEmpty = function () {
  return this._data.length === 0;
};

module.exports = Heap;
