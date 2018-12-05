function node(v, f) {
    this.freq = f;
    this.value = v;
    this.left = null;
    this.right = null;
    return this;
}


function Huffman(C) {
    var n = C.length;
    var Q = C;
    var ind, minq;
    for (var i=0; i < n-1; i++) {
        var z = new node('', 0);
        minq = extractMinQ(Q);  
        z.left = minq[0];
        Q.splice(minq[1],1);
        minq = extractMinQ(Q);  
        z.right = minq[0];
        Q.splice(minq[1],1);
        z.freq = z.left.freq + z.right.freq;
        Q.push(z);
    }
    return extractMinQ(Q)[0];
}


function extractMinQ(C) {
    var m = Number.POSITIVE_INFINITY;
    var ind = -1;
    for (var i=0; i<C.length; i++) {
        if (C[i].freq < m) {
            m = C[i].freq;
            ind = i;
        }
    }
    return [C[ind], ind];
}

var C = [
    new node('a', 45),
    new node('b', 13),
    new node('c', 12),
    new node('d', 16),
    new node('e', 9),
    new node('f', 5)
];

var root = Huffman(C);
console.log(root);