module.exports = LRUCache;

function LRUCache(limit) {
    this.size = 0;
    this.limit = limit;
    this._cache = {};

    this.tail = this.head = null;
}

LRUCache.prototype.put = function (key, value) {
  var entry = { key: key, value: value };

  this._cache[key] = entry;

  if(this.tail) {
    this.tail.next = entry;
    entry.prev = this.tail;
  }
  else {
    this.head = entry;
  }
  this.tail = entry;
  if(this.size === this.limit) {
    return this.shift();
  }
  else {
    this.size++;
  }
};

LRUCache.prototype.shift = function () {
  var entry = this.head;

  if(entry) {
    if(this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    }
    else {
      this.head = null;
    }
    entry.next = entry.prev = null;
    delete this._cache[entry.key];
  }

  return entry;
};

LRUCache.prototype.get = function (key) {
  var entry = this._cache[key];
  if(typeof entry === 'undefined') return;

  if(entry === this.tail) {
    return entry;
  }
  if(entry.next) {
    if(entry === this.head) {
      this.head = entry.next;
    }
    entry.next.prev = entry.prev;
  }
  if(entry.prev) {
    entry.prev.next = entry.next;
  }
  entry.next = null;
  entry.prev = this.tail;
  if(this.tail) {
    this.tail.next = entry;
  }
  this.tail = entry;

  return entry;
};

LRUCache.prototype.set = function (key, value) {
  var entry = this.get(key);

  if(entry) {
    entry.value = value;
  }
  else {
    return this.put(key, value);
  }
  return entry;
};

LRUCache.prototype.remove = function (key) {
  var entry = this._cache[key];

  if(!entry) return;

  delete this._cache[entry.key];

  if(entry.next && entry.prev) {
    // relink the older entry with the newer entry
    entry.prev.next = entry.next;
    entry.next.prev = entry.prev;
  }
  else if(entry.next) {
    entry.next.prev = null;
    this.head = entry.next;
  }
  else if(entry.prev) {
    entry.prev.next = null;
    this.tail = entry.prev;
  }
  else {
    this.head = this.tail = null;
  }

  this.size--;

  return entry;
};

LRUCache.prototype.clear = function() {
  this.head = this.tail = null;
  this.size = 0;
  this._cache = {};
};

LRUCache.prototype.find = function (key) {
  return this._cache[key];
};

LRUCache.prototype.toJSON = function () {
  var s = [], entry = this.head;

  while(entry) {
    s.push({ key: entry.key, value: entry.value });
    entry = entry.next;
  }

  return s;
};

LRUCache.prototype.toString = function() {
  var s = '', entry = this.head;

  while(entry) {
    s += String(entry.key) + ':' + entry.value;
    entry = entry.next;
    if(entry) {
      s += ' < ';
    }
  }
  return s;
};
