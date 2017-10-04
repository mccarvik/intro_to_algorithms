function Tree( d, l, r, p ) 
{   
    // privite data 
    var data = d;
    var par = p;
    var leftChild = l; 
    var rightChild = r; 

    // public functions 
    this.getData = function()
    {
        return data;
    };

    this.left = function()
    {
        return leftChild; 
    };

    this.right = function()
    {
        return rightChild; 
    };
    
    this.parent = function()
    {
        return par;
    };
    
    this.setLeft = function(l)
    {
        leftChild = l;
    };
    
    this.setRight = function(r)
    {
        rightChild = r;
    };
    
    this.setParent = function(p)
    {
        par = p;
    }
    
    this.setData = function(d)
    {
        data = d;
    }

}

function inorder(tree) {
    if (tree !== undefined) {
        inorder(tree.left());
        process.stdout.write(tree.getData() + " ");
        inorder(tree.right());
    }
}

function preorder(tree) {
    if (tree !== undefined) {
        process.stdout.write(tree.getData() + " ");
        inorder(tree.left());
        inorder(tree.right());
    }
}

function postorder(tree) {
    if (tree !== undefined) {
        inorder(tree.left());
        inorder(tree.right());
        process.stdout.write(tree.getData() + " ");
    }
}

function search(tree, k) {
    if (tree === undefined || tree.getData() === k) {
        return tree;
    } else {
        if (k < tree.getData()) {
            return search(tree.left(), k);
        } else {
            return search(tree.right(), k);
        }
    }
}

function minimum(tree) {
    while (tree.left() !== undefined) {
        tree = tree.left();
    }
    return tree;
}

function maximum(tree) {
    while (tree.right() !== undefined) {
        tree = tree.right();
    }
    return tree;
}

function successor(tree) {
    if (tree.right() !== undefined) {
        return minimum(tree.right());
    } else {
        var y = tree.parent();
        while (y !== undefined && tree == y.right()) {
            tree = y;
            y = y.parent();
        }
        return y;
    }
}

function predecessor(tree) {
    if (tree.left() !== undefined) {
        return maximum(tree.left());
    } else {
        var y = tree.parent();
        while (y !== undefined && tree == y.left()) {
            tree = y;
            y = y.parent();
        }
        return y;
    }
}

function insert(tree, z) {
    var y = undefined;
    var x = tree;
    while (x !== undefined) {
        y = x;
        if (z.getData() < x.getData()) {
            x = x.left();
        } else {
            x = x.right();
        }
    }
    z.setParent(y);
    if (y === undefined) {
        tree = z; // tree was empty
    } else {
        if (z.getData() < y.getData()) {
            y.setLeft(z);
        } else {
            y.setRight(z);
        }
    }
}

function del(tree, z) {
    var y, x;
    if (z.left() === undefined || z.right() === undefined) {
        y = z;
    } else {
        y = successor(z);
    }
    
    if (z.left() !== undefined) {
        x = z.left();
    } else {
        x = z.right();
    }
    
    if (x !== undefined) {
        x.setParent(y.parent());
    }
    
    if (y.parent() !== undefined) {
        if (y === y.parent().left()) {
            y.parent().setLeft(x);
        } else {
            y.parent().setRight(x);
        }
    }
    
    if (y !== z) {
        z.setData(y.getData());
    }
}

var root = new Tree(5, undefined, undefined, undefined);
insert(root, new Tree(3));
insert(root, new Tree(7));
insert(root, new Tree(4));
insert(root, new Tree(1));
insert(root, new Tree(9));
insert(root, new Tree(8));


inorder(root);
console.log();

del(root, search(root, 7));
inorder(root);
console.log();

// preorder(root);
// postorder(root);
// console.log(search(root, 8));
// console.log(maximum(root).getData());
// console.log(minimum(root).getData());
// console.log(predecessor(search(root, 7)).getData());
// console.log(successor(search(root, 7)).getData());