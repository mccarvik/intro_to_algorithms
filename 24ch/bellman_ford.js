var lists = require('../10ch/stack.js');

function DFS_topological(G) {
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
        color[u] = 'g';
        t += 1;
        dist[u] = t;
        for (var i=0; i < G[1][u].length; i++) {
            var v = G[1][u][i];
            if (color[v] == 'w') {
                prev[v] = u;
                // console.log("IN LOOP");
                // console.log(scc);
            }
        }
        color[u] = 'b';
        topo_order.insert(u);
        t += 1;
        fins[u] = t;
    }
    
    for (var i=0; i < G[0].length; i++) {
        var u = G[0][i];
        if (color[u] == 'w') {
            dfs_visit(u);
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
    return topo_order;
}


function bellman_ford(G, s) {
    // finds shortest path from every vertex, can have negative weights, and will detect cycles
    var dist = {};
    var prev = {};
    // Initialize single source
    for (var i=0; i < G[0].length; i++) {
        dist[G[0][i]] = Number.POSITIVE_INFINITY;
        prev[G[0][i]] = null;
    }
    dist[s] = 0;
    
    function relax(u, v, w) {
        if (dist[v] > dist[u] + w) {
            dist[v] = dist[u] + w;
            prev[v] = u;
        }
    }
    
    // passes over every edge V times
    for (var i=0; i < G[0].length; i++) {
        for (var j=0; j < G[0].length; j++) {
            var u = G[0][j];
            for (var k=0; k < G[1][u].length; k++) {
                var v = G[1][u][k][0];
                var w = G[1][u][k][1];
                relax(u, v, w);
            }
        }
    }
    
    // Check for negative cycles
    for (var j=0; j < G[0].length; j++) {
        var u = G[0][j];
        for (var k=0; k < G[1][u].length; k++) {
            var v = G[1][u][k][0];
            var w = G[1][u][k][1];
            if (dist[v] > dist[u] + w) {
                console.log("negative cycle");
                return false;
            }
        }
    }
    
    console.log("prev:");
    console.log(prev);
    console.log("dist:");
    console.log(dist);
}


function bellman_ford_dag(G, s) {
    // if we know the graph is a dag, only need to pass over the vertices one time
    // provided the vertices are in topological order
    var dist = {};
    var prev = {};
    // Initialize single source
    for (var i=0; i < G[0].length; i++) {
        dist[G[0][i]] = Number.POSITIVE_INFINITY;
        prev[G[0][i]] = null;
    }
    dist[s] = 0;
    
    function relax(u, v, w) {
        if (dist[v] > dist[u] + w) {
            dist[v] = dist[u] + w;
            prev[v] = u;
        }
    }
    
    // passes over every edge V times
    var topo_order = DFS_topological(G).printList();
    for (var j=0; j < topo_order.length; j++) {
        var u = G[0][j];
        for (var k=0; k < G[1][u].length; k++) {
            var v = G[1][u][k][0];
            var w = G[1][u][k][1];
            relax(u, v, w);
        }
    }
    
    console.log("prev:");
    console.log(prev);
    console.log("dist:");
    console.log(dist);
}


var G = [
    ['s', 't', 'x', 'y', 'z'],
    {
        s : [['t', 6], ['y', 7]],
        t : [['x', 5], ['y', 8], ['z', -4]],
        x : [['t', -2]],
        y : [['x', -3], ['z', 9]],
        z : [['s', 2], ['x', 7]],
    }
];
var G_dag = [
    ['r', 's', 't', 'x', 'y', 'z'],
    {
        r : [['s', 5], ['t', 3]],
        s : [['t', 2], ['x', 6]],
        t : [['x', 7], ['y', 4], ['z', 2]],
        x : [['y', -1], ['z', 1]],
        y : [['z', -2]],
        z : [],
    }
];

// bellman_ford(G, 's');
bellman_ford_dag(G_dag, 's');
