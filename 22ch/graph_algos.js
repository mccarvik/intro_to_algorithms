var lists = require('../10ch/stack.js');


function BFS(G, s) {
    // breath first search computes shortest path distances
    var color = {};
    var dist = {};
    var prev = {};
    // setup
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        color[u] = 'w';
        dist[u] = null;
        prev[u] = null;
    }
    
    // Algo
    color[s] = 'g';
    dist[s] = 0;
    prev[s] = null;
    var Q = new lists.Queue();
    Q.enqueue(s);
    
    while (Q.size > 0) {
        Q.printList();
        var u = Q.dequeue().data;
        for (var i=0; i < G[1][u].length; i++) {
            var v = G[1][u][i];
            if (color[v] == 'w') {
                color[v] = 'g'
                dist[v] = dist[u] + 1;
                prev[v] = u;
                Q.enqueue(v);
            }
        }
        color[u] = 'b';
    }
    
    console.log("dists:")
    console.log(dist);
    console.log("prevs:")
    console.log(prev);
    
    printPath(G, s, 'y', prev);
}


function printPath(G, s, v, prev) {
    if (v === s) {
        console.log(s);
    } else {
        if (prev[v] === null) {
            console.log("no path");
        } else {
            printPath(G, s, prev[v], prev);
        }
        console.log(v);
    }
}


function DFS(G) {
    // depth first search used for characteristics about the tree like cycles etc
    var color = {};
    var prev = {};
    var dist = {};
    var fins = {}
    // setup
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        color[u] = 'w';
        prev[u] = null;
    }
    var t = 0
    
    function dfs_visit(u) {
        color[u] = 'g';
        t += 1;
        dist[u] = t;
        for (var i=0; i < G[1][u].length; i++) {
            var v = G[1][u][i];
            if (color[v] == 'w') {
                prev[v] = u;
                dfs_visit(v);
            }
        }
        color[u] = 'b';
        t += 1;
        fins[u] = t;
    }
    
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        if (color[u] == 'w') {
            dfs_visit(u);
        }
    }
    console.log("dists:")
    console.log(dist);
    console.log("prevs:")
    console.log(prev);
    console.log("fins:")
    console.log(fins);
}

// undirected graph
var G = [
    ['r', 's', 't', 'u', 'v', 'w', 'x', 'y'],
    {
        r: ['s', 'v'],
        s : ['r', 'w'],
        t : ['w', 'x'],
        u : ['u', 'w', 'x'],
        v : ['r'],
        w : ['s', 't', 'x'],
        x : ['w', 't', 'u', 'y'],
        y : ['x', 'u']
    }
];

// directed graph
var G2 = [
    ['u', 'v', 'w', 'x', 'y', 'z'],
    {
        u : ['v', 'x'],
        v : ['y'],
        w : ['y', 'z'],
        x : ['v'],
        y : ['x'],
        z : ['z']
    }
];

// BFS(G, 's');
DFS(G2, 's');