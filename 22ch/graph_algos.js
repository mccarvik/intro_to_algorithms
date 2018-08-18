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
    var fins = {};
    var topo_order = new lists.Linked_List();
    // setup
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        color[u] = 'w';
        prev[u] = null;
    }
    var t = 0
    
    function dfs_visit(u) {
        var scc = [u]
        color[u] = 'g';
        t += 1;
        dist[u] = t;
        for (var i=0; i < G[1][u].length; i++) {
            var v = G[1][u][i];
            if (color[v] == 'w') {
                prev[v] = u;
                scc.push(dfs_visit(v));
                // console.log("IN LOOP");
                // console.log(scc);
            }
        }
        color[u] = 'b';
        topo_order.insert(u);
        t += 1;
        fins[u] = t;
        scc = [].concat.apply([], scc);
        return scc;
    }
    
    var scc = []
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        if (color[u] == 'w') {
            scc.push(dfs_visit(u));
        }
    }
    
    // console.log("dists:")
    // console.log(dist);
    // console.log("prevs:")
    // console.log(prev);
    // console.log("finished:")
    // console.log(fins);
    // console.log("Topoogical Sort:");
    // topo_order.printList();
    var rets = {};
    rets.fins = fins;
    rets.prev = prev;
    rets.scc = scc;
    return rets;
}


function transposeGraph(G) {
    var G_T = [];
    G_T[0] = G[0];
    var dict = {};
    G_T[1] = {};
    // create empty list for each vertex
    for (var i=0; i < G[0].length; i++) {
        dict[G[0][i]] = [];
        // G_T[1][G[0][i]] = []
    }

    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        var lis = G[1][u];
        for (var j=0; j < lis.length; j++) {
            var v = lis[j];
            dict[v].push(u);
        }
    }
    G_T[1] = dict;
    return G_T;
}


function DFS_strongly_connected(G) {
    var fins = DFS(G).fins;
    
    // Transpose Graph
    var G_T = transposeGraph(G);
    
    // consider vertices in decreasing order of fins
    // Create items array
    var items = Object.keys(fins).map(function(key) {
        return [key, fins[key]];
    });
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    var new_vertex_order = []
    for (var i=0; i < items.length; i++) {
        new_vertex_order.push(items[i][0]);
    }
    G_T[0] = new_vertex_order;
    
    var rets = DFS(G_T);
    console.log(rets.scc);
    
}


// strongly connected graph
var G_scc = [
    ['c', 'b', 'a', 'd', 'e', 'f', 'g', 'h'],
    {
        a : ['b'],
        b : ['e', 'f'],
        c : ['g', 'd'],
        d : ['c', 'h'],
        e : ['a'],
        f : ['g'],
        g : ['f', 'h'],
        h : ['h']
    }
];


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

// DAG -> directed acyclic graph
var dressed  = [
    ['shirt', 'watch', 'undershorts', 'socks', 'shoes', 'pants', 'tie', 'belt', 'jacket'],
    {
        shirt : ['tie', 'belt'],
        watch : [],
        tie : ['jacket'],
        undershorts : ['pants', 'shoes'],
        socks : ['shoes'],
        pants : ['belt', 'shoes'],
        belt : ['jacket'],
        jacket : [],
        shoes : [],
    }
];

// BFS(G, 's');
// DFS(G2, 's');
// DFS(dressed);
DFS_strongly_connected(G_scc);