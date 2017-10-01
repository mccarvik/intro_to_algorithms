exports.Stack = function(){
  this.top = null;
  this.size = 0;
  
  this.empty = function() {
      if (this.top === null) {
          return true;
      } else {
          return false;
      }
  }
  
  this.push = function(data) {
    var node = new Node(data);
    node.previous = this.top;
    this.top = node;
    this.size += 1;
    return this.top;
  };
  
  this.pop = function() {
    var temp = this.top;
    this.top = this.top.previous;
    this.size -= 1;
    return temp;  
  };
  
};

exports.Queue = function() {
  this.first = null;
  this.size = 0;
  
  this.enqueue = function(data) {
    var node = new Node(data);

    if (!this.first){
        this.first = node;
    } else {
        var n = this.first;
        while (n.next) {
            n = n.next;
        }
        n.next = node;
    }

    this.size += 1;
    return node;
  };
  
  this.dequeue = function() {
    var temp = this.first;
    this.first = this.first.next;
    this.size -= 1;
    return temp;
  };
  
};

var Node = function(data) {
  this.data = data;
  this.next = null;
};