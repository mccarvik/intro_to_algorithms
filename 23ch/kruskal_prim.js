// Union-Find
var sz = [];

// Make Sets of one item for each vertex to start algo
function make_sets(v) {
    var a = [];
    var arr = Array.from(v);
    for (var i=0; i < arr.length; i++) {
        a.push(new Set([arr[i]]));
    }
    return a;
}

// find which set the vertex is in
function find(a, x) {
    for (var i=0; i < a.length; i++) {
        if (a[i].has(x)) {
            return a[i];
        }
    }
}

// makes a union of whatever sets these two vertices are in
// adds them back to the set
function union(a, p, q) {
    // weighted quick-union
    var i = find(a, p);
    var j = find(a, q);
    
    a.splice(a.indexOf(i), 1);
    a.splice(a.indexOf(j), 1);
    var ns = new Set(Array.from(i).concat(Array.from(j)));
    a.push(ns);
    return a;
}

// check if these two vertices are connected in the same set yet
function connected(a, p, q) {
    return find(a, p) === find(a, q);
}

// Priority queue
var heap = {
    h: [undefined],
    insert: function(e) {
        this.h.push(e);
        this.swim(this.h.length-1);
        //console.log(this.h);
    },
    swim: function(idx) {
        var p = Math.floor(idx/2);

        while(p > 0 && this.less(idx, p)) {
            var tmp = this.h[p];
            this.h[p] = this.h[idx];
            this.h[idx] = tmp;
            idx = p;
            p = Math.floor(p/2);
        }
    },
    sink: function(idx) {

        while(2*idx <= this.h.length - 1) {
            var j = 2*idx;
            if(j < this.h.length - 1 && this.less(j+1, j)) j++;

            if(this.less(j, idx)) {
                var tmp = this.h[j];
                this.h[j] = this.h[idx];
                this.h[idx] = tmp;
            }
            else break;

            idx = j;
        }
    },
    del_min: function() {
        var min = this.h.splice(1, 1),
            last = this.h.pop();

        this.h.splice(1, 0, last);
        this.sink(1);
        //console.log(this.h);
        return min[0];
    },
    sort: function() {
        var sorted = [];

        while(this.h.length > 1) {
            sorted.push(this.del_min());
        }

        return sorted;
    },
    empty: function() {
        return this.h.length === 1;
    },
    less:function(a, b) {
        return this.h[a].w < this.h[b].w;
    }
};

// Kruskal
function kruskal(G, heap) {
    // always pick the edge with smallest weight
    // Determine if including it will create a cycle
    // If so, ignore the edge
    
    // Make a set for each vertex
    var a = make_sets(G.vertices);
    
    //  TODO
    var parent = {};
    var sum = 0;
    
    // priority queue holds sorted edges of increasing order in weight
    while(heap.empty() === false) {
        var e = heap.del_min();

        // checks if these two nodes are connected yet on the MST
        if(connected(a, e.x, e.y) === false) {
            parent[e.y] = e.x;
            a = union(a, e.x, e.y);
            console.log(a);
            sum += e.w;
        }
    }
    return sum;
}


function prim(G, heap, s) {
    
}



// Graph
var G = {
    nedges: 0,
    edges: {},
    vertices: new Set([]),
    insertEdge: function(x,y,w,directed) {
        this.vertices.add(x);
        this.vertices.add(y);
        var e = {x:x, y:y, w:w},
            edges = this.edges[x]||[];

        edges.push(e);
        this.edges[x] = edges;

        if(directed) {
            this.nedges++
        }
        else {
            this.insertEdge(y,x,w,true);
        }
    }
};

function addEdge(e, directed) {
    heap.insert(e);
    G.insertEdge(e.x, e.y, e.w, directed)
}


addEdge({ x: 'a', y: 'b', w: 4 }, false);
addEdge({ x: 'a', y: 'h', w: 8 }, false);
addEdge({ x: 'b', y: 'c', w: 8 }, false);
addEdge({ x: 'b', y: 'h', w: 11 }, false);
addEdge({ x: 'c', y: 'd', w: 7 }, false);
addEdge({ x: 'c', y: 'f', w: 4 }, false);
addEdge({ x: 'c', y: 'i', w: 2 }, false);
addEdge({ x: 'd', y: 'e', w: 9 }, false);
addEdge({ x: 'd', y: 'f', w: 14 }, false);
addEdge({ x: 'e', y: 'f', w: 10 }, false);
addEdge({ x: 'f', y: 'g', w: 2 }, false);
addEdge({ x: 'g', y: 'h', w: 1 }, false);
addEdge({ x: 'g', y: 'i', w: 6 }, false);
addEdge({ x: 'h', y: 'i', w: 7 }, false);

console.log(kruskal(G, heap));