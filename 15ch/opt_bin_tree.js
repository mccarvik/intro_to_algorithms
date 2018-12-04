
// will create an optimal BST when different nodes are requested more often
// dynamica programming 
function optimal_bst(p, q, n) {
    var e = zeros([n+1, n]);
    var w = zeros([n+1, n]);
    var rt = zeros([n, n]);
    
    for (var i=1; i<n+1; i++) {
        e[i][i-1] = q[i-1];
        w[i][i-1] = q[i-1];
    }
    
    for (var l=1; l<n; l++) {
        for (var i=1; i<n-l+1; i++) {
            var j = i + l - 1;
            e[i][j] = Number.POSITIVE_INFINITY;
            w[i][j] = w[i][j-1] + p[j] + q[j];
            for (var r=i; r<=j; r++) {
                var t = e[i][r-1] + e[r+1][j] + w[i][j];
                if (t < e[i][j]) {
                    e[i][j] = t;
                    rt[i][j] = r;
                }
            }
        }
    }
    return [e, rt];
}


function zeros(dims) {
    var array = [];
    for (var i = 0; i < dims[0]; ++i) {
        array.push(dims.length == 1 ? 0 : zeros(dims.slice(1)));
    }
    return array;
}


var p = [0, 0.15, 0.1, 0.05, 0.10, 0.2];
var q = [0.05, 0.1, 0.05, 0.05, 0.05, 0.1];

console.log(optimal_bst(p, q, p.length));