
exports.Linked_List = function(){
    this.head = null;
    this.size = 0
    
    this.insert = function(data){
        var node = new Node(data);
        node.nextNode = this.head;
        if (this.head !== null) {
            this.head.prevNode = node;
        }
        this.head = node;
        this.size += 1;
        return this.head;
    }
    
    this.search = function(k) {
        var x = this.head;
        while (x !== null && x.data !== k) {
            x = x.nextNode;
        }
        return x;
    }
    
    this.delete = function(x) {
        if (x.prevNode !== null){
            x.prevNode.nextNode = x.nextNode;
        } else {
            this.head = x.nextNode
        }
        
        if (x.next !== null) {
            x.nextNode.prevNode = x.prevNode;
        }
        this.size -= 1;
    }
}


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
    node.prevNode = this.top;
    this.top = node;
    this.size += 1;
    return this.top;
  };
  
  this.pop = function() {
    var temp = this.top;
    this.top = this.top.prevNode;
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
        while (n.nextNode) {
            n = n.nextNode;
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
    this.nextNode = null;
    this.prevNode = null;
}