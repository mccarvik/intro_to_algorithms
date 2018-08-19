function prim(G, s) {
    // From s grows the tree adding the closest vertex to s
    // then repeats the process with the closest vertext to any vertex in the constructed tree
    var sum = 0;
    var dists = {};
    var prev = {};
    // Set all the keys to dist infinity and prev null
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        dists[u] = Number.POSITIVE_INFINITY;
        prev[u] = null;
    }
    
    // create Q with dist to neighbors of start or infinity if not neighbors
    dists[s] = 0;
    var Q = createQ(G[0], s);
    delete Q[s];
    for (var i=0; i < G[1][s].length; i++) {
        var next = G[1][s][i];
        if (next[0] in Q && next[1] < dists[next[0]]) {
            prev[next[0]] = s;
            dists[next[0]] = next[1];
            Q[next[0]] = next[1];
        }
    }
    
    while(Object.keys(Q).length > 0) {
        // Get the closest Vertex to the tree
        var mn = getMin(Q);
        sum += Q[mn];
        delete Q[mn];
        for (var i=0; i < G[1][mn].length; i++) {
            var next = G[1][mn][i];
            if (next[0] in Q && next[1] < dists[next[0]]) {
                prev[next[0]] = mn;
                dists[next[0]] = next[1];
                Q[next[0]] = next[1];
            }
        }
    }
    console.log("prev:");
    console.log(prev);
    console.log("dists:");
    console.log(dists);
    console.log("sum:");
    console.log(sum);
}


function createQ(V, s){
    var Q = {};
    for (var i=0; i<V.length; i++) {
        Q[V[i]] = Number.POSITIVE_INFINITY;
    }
    Q[s] = 0;
    return Q;
}


function getMin(Q) {
    var min = Number.POSITIVE_INFINITY;
    var min_vert;
    for (var i=0; i < Object.keys(Q).length; i++) {
        if (Q[Object.keys(Q)[i]] < min) {
            min_vert = Object.keys(Q)[i];
            min = Q[Object.keys(Q)[i]];
        }
    }
    return min_vert;
}


var G = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    {
        a : [['b', 4], ['h', 8]],
        b : [['a', 4], ['c', 8]],
        c : [['d', 7], ['f', 4], ['i', 2]],
        d : [['c', 7], ['e', 9], ['f', 14]],
        e : [['d', 9], ['f', 10]],
        f : [['c', 4], ['d', 14], ['e', 10], ['g', 2]],
        g : [['f', 2], ['h', 1], ['i', 6]],
        h : [['a', 8], ['g', 1], ['i', 7]],
        i : [['c', 2], ['g', 6], ['h', 7]]
    }
];
prim(G, 'a');