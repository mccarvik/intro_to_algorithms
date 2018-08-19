
function dijkstra(G, s) {
    // Slightly faster than bellman_ford 
    // maintains a set of S of vertices whose final shortest path have already been found
    // Same thing as prims but can handle weights using the relax function
    var dists = {};
    var prev = {};
    // Initialize single source
    for (var i=0; i < G[0].length; i++) {
        dists[G[0][i]] = Number.POSITIVE_INFINITY;
        prev[G[0][i]] = null;
    }
    dists[s] = 0;
    
    function relax(u, v, w) {
        if (dists[v] > dists[u] + w) {
            dists[v] = dists[u] + w;
            prev[v] = u;
            Q[v] = dists[u] + w
        }
    }
    
    var Q = createQ(G[0], s);
    delete Q[s];
    for (var i=0; i < G[1][s].length; i++) {
        var v = G[1][s][i][0];
        var w = G[1][s][i][1];
        relax(s, v, w);
    }
    
    while(Object.keys(Q).length > 0) {
        // Get the closest Vertex to the tree
        var u = getMin(Q);
        delete Q[u];
        for (var i=0; i < G[1][u].length; i++) {
            var v = G[1][u][i][0];
            var w = G[1][u][i][1];
            relax(u, v, w);
        }
    }
    console.log("prev:");
    console.log(prev);
    console.log("dists:");
    console.log(dists);
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

// Graph
var G = [
    ['s', 't', 'x', 'y', 'z'],
    {
        s : [['t', 10], ['y', 5]],
        t : [['x', 1], ['y', 2]],
        x : [['z', 4]],
        y : [['t', 3], ['x', 9], ['z', 2]],
        z : [['s', 7], ['x', 6]],
    }
];

dijkstra(G, 's');