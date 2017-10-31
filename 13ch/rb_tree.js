function Tree( d, l, r, p, c ) {   
    // privite data 
    var data = d;
    var par = p;
    var leftChild ; 
    if (l !== undefined) {
        leftChild = l;
    } else if (data !== undefined) {
        leftChild = new Tree(undefined, undefined, undefined, this, 'b');
    }
    var rightChild;
    if (r !== undefined) {
        rightChild = r;
    } else if (data !== undefined) {
        rightChild = new Tree(undefined, undefined, undefined, this, 'b');
    }
    var color = c;

    // public functions 
    this.getData = function() {
        return data;
    };

    this.left = function() {
        return leftChild; 
    };

    this.right = function() {
        return rightChild; 
    };
    
    this.parent = function() {
        return par;
    };
    
    this.color = function() {
        return color;
    };
    
    this.setLeft = function(l) {
        leftChild = l;
    };
    
    this.setRight = function(r) {
        rightChild = r;
    };
    
    this.setParent = function(p) {
        par = p;
    };
    
    this.setData = function(d) {
        data = d;
    };
    
    this.setColor = function(c) {
        color = c;
    };

}

function levelOrder(root) {
  if (!root) return [];
  var array = [];
  search(root, 1);

  function search(root, level) {
    if (root) {
      if (array.length < level) {
        array.push([]);
      }
      var arr = array[level - 1];
      if (root.getData() !== undefined) {
        arr.push(root.getData() + root.color());
      } else {
        arr.push("X" + root.color());  
      }
      search(root.left(), level + 1);
      search(root.right(), level + 1);
    } else {
      return;
    }
  }

  console.log(array);
};

function inorder(tree) {
    if (tree.getData() !== undefined) {
        inorder(tree.left());
        process.stdout.write(tree.getData() + tree.color() + " ");
        inorder(tree.right());
    }
}

function preorder(tree) {
    if (tree.getData() !== undefined) {
        process.stdout.write(tree.getData() + tree.color() + " ");
        preorder(tree.left());
        preorder(tree.right());
    }
};

function postorder(tree) {
    if (tree.getData() !== undefined) {
        inorder(tree.left());
        inorder(tree.right());
        process.stdout.write(tree.getData() + " ");
    }
};

function search(tree, k) {
    if (tree.getData() === undefined || tree.getData() === k) {
        return tree;
    } else {
        if (k < tree.getData()) {
            return search(tree.left(), k);
        } else {
            return search(tree.right(), k);
        }
    }
};

function minimum(tree) {
    while (tree.left().getData() !== undefined) {
        tree = tree.left();
    }
    return tree;
};

function maximum(tree) {
    while (tree.right().getData() !== undefined) {
        tree = tree.right();
    }
    return tree;
};

function successor(tree) {
    if (tree.right().getData() !== undefined) {
        return minimum(tree.right());
    } else {
        var y = tree.parent();
        while (y !== undefined.getData() && tree == y.right()) {
            tree = y;
            y = y.parent();
        }
        return y;
    }
}

function predecessor(tree) {
    if (tree.left().getData() !== undefined) {
        return maximum(tree.left());
    } else {
        var y = tree.parent();
        while (y.getData() !== undefined && tree == y.left()) {
            tree = y;
            y = y.parent();
        }
        return y;
    }
}

// Edited functions for red-black functionality

function left_rotate(tree, x) {
    var y = x.right();
    x.setRight(y.left());
    if (y.left().getData() !== undefined) {
        y.left().setParent(x);
    }
    
    y.setParent(x.parent());
    if (x.parent() === undefined) {
        tree = y; // tree was empty
    } else {
        if (x === x.parent().left()) {
            x.parent().setLeft(y);
        } else {
            x.parent().setRight(y);
        }
    }
    y.setLeft(x);
    x.setParent(y);
    return tree;
};

function right_rotate(tree, x) {
    var y = x.left();
    x.setLeft(y.right());
    if (y.right().getData() !== undefined) {
        y.right().setParent(x);
    }
    
    y.setParent(x.parent());
    if (x.parent().getData() === undefined) {
        tree = y; // tree was empty
    } else {
        if (x === x.parent().right()) {
            x.parent().setRight(y);
        } else {
            x.parent().setLeft(y);
        }
    }
    y.setRight(x);
    x.setParent(y);
    return tree;
};

function insert(tree, z) {
    var y = undefined;
    var x = tree;
    while (x.getData() !== undefined) {
        y = x;
        if (z.getData() < x.getData()) {
            x = x.left();
        } else {
            x = x.right();
        }
    }
    z.setParent(y);
    if (y.getData() === undefined) {
        tree = z; // tree was empty
    } else {
        if (z.getData() < y.getData()) {
            y.setLeft(z);
        } else {
            y.setRight(z);
        }
    }
    
    z.setColor('r');
    tree = insert_fixup(tree, z);
    return tree;
}

function del(tree, z) {
    z = search(tree, z);
    var y, x;
    if (z.left().getData() === undefined || z.right().getData() === undefined) {
        y = z;
    } else {
        y = successor(z);
    }
    
    if (y.left().getData() !== undefined) {
        x = y.left();
    } else {
        x = y.right();
    }
    
    if (x.getData() !== undefined) {
        x.setParent(y.parent());
    } else {
        x = new Tree(undefined, undefined, undefined, y.parent(), 'b');
    }
    
    if (y.parent().getData() !== undefined) {
        if (y === y.parent().left()) {
            y.parent().setLeft(x);
        } else {
            y.parent().setRight(x);
        }
    } else {
        tree = x;
    }
    
    console.log(z.getData() + "  " + z.color());
    if (y !== z) {
        z.setData(y.getData());
    }
    
    if (y.color() === 'b') {
        tree = delete_fixup(tree, x);
    }
    
    return tree;
}

function insert_fixup(tree, z) {
    while (z.parent() !== undefined && z.parent().parent() !== undefined && z.parent().color() === 'r' ) {
        if (z.parent() === z.parent().parent().left()) {
            var y = z.parent().parent().right();
            if (y !== undefined && y.color() === 'r') {
                z.parent().setColor('b');
                y.setColor('b');
                z.parent().parent().setColor('r');
                z = z.parent().parent();
            } else {
                if (z.parent().right() === z) {
                    z = z.parent();
                    tree = left_rotate(tree, z);
                }
                z.parent().setColor('b');
                z.parent().parent().setColor('r');
                tree = right_rotate(tree, z.parent().parent());
            }
        } else if (z.parent() === z.parent().parent().right()) {
            var y = z.parent().parent().left();
            if (y !== undefined && y.color() === 'r') {
                z.parent().setColor('b');
                y.setColor('b');
                z.parent().parent().setColor('r');
                z = z.parent().parent();
            } else {
                if (z.parent().left() === z) {
                    z = z.parent();
                    tree = right_rotate(tree, z);
                }
                z.parent().setColor('b');
                z.parent().parent().setColor('r');
                tree = left_rotate(tree, z.parent().parent());
            }
        }
    }
    tree.setColor('b')
    return tree;
}

function delete_fixup(tree, x) {
    while (x.color() === 'b' && x !== tree) {
        console.log(x.getData() + "  " + x.color());
        if (x === x.parent().left()) {
            var w = x.parent().right()
            if (w.color() === 'r') {
                w.setColor('b');
                x.parent().setColor('r');
                tree = left_rotate(tree, x.parent());
                w = x.parent().right();
            }
            
            if (w.left().color() === 'b' && w.right().color() === 'b') {
                w.setColor('r');
                x = x.parent();
            } else {
                if (w.right().color() === 'b') {
                    w.setColor('r');
                    tree = right_rotate(tree, w);
                    w = x.parent().right();
                }
                
                w.setColor(x.parent().color());
                x.parent().setColor('b');
                w.right().setColor('b');
                tree = left_rotate(tree, x.parent());
                x = tree;
            }
        } else {
            var w = x.parent().left()
            if (w.color() === 'r') {
                w.setColor('b');
                x.parent().setColor('r');
                tree = right_rotate(tree, x.parent());
                w = x.parent().left();
            }
            
            if (w.right().color() === 'b' && w.left().color() === 'b') {
                w.setColor('r');
                x = x.parent();
            } else {
                if (w.left().color() === 'b') {
                    w.setColor('r');
                    tree = left_rotate(tree, w);
                    w = x.parent().left();
                }
                
                w.setColor(x.parent().color());
                x.parent().setColor('b');
                w.left().setColor('b');
                tree = right_rotate(tree, x.parent());
                x = tree;
            }
        }
    }
    x.setColor('b');
    return tree;
}


var root = new Tree(1, undefined, undefined, undefined, 'b');
root = insert(root, new Tree(3));
root = insert(root, new Tree(7));
root = insert(root, new Tree(4));
root = insert(root, new Tree(9));
root = insert(root, new Tree(6));
root = insert(root, new Tree(8));
root = insert(root, new Tree(14));
root = insert(root, new Tree(2));
root = insert(root, new Tree(11));
levelOrder(root)

root = del(root, 7);
levelOrder(root)

console.log();