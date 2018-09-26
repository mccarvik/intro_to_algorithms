
function matrix_multiply(A, B) {
    if (A[0].length !== B.length) {
        console.log("ERROR - rows of A must equal columns of B");
        return;
    }
    
    var C = []
    for (var i=0; i<A.length; i++) {
        C.push([]);
    }
    
    for (var i=0; i<A.length; i++) {
        for (var j=0; j<B[0].length; j++) {
            C[i][j] = 0
            for (var k=0; k<A[0].length; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}


function matrix_chain_order(p) {
    var n = p.length - 1;
    var m = zeros([n, n]);
    var s = zeros([n, n]);
    for (var l=2; l<=n; l++) {
        for (var i=0; i<n-l+1; i++) {
            var j = i + l - 1;
            m[i][j] = Number.POSITIVE_INFINITY;
            for (var k=i; k<=j-1; k++) {
                var q = m[i][k] + m[k+1][j] + p[i] * p[k+1] * p[j+1];
                if (q < m[i][j]) {
                    m[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
    }
    print_optimal_parens(s, 0, 5);
    console.log();
    return [m, s];
}


// very inefficient
function matrix_recursive_wrapper(p, i, j) {
    // inner function calculates each sub problem
    function matrix_chain_order_recursive(p, i, j) {
        if (i == j) {
            return 0;
        }
        m[i][j] = Number.POSITIVE_INFINITY;
        for (var k=i; k<j; k++) {
            var q = matrix_chain_order_recursive(p, i, k) + matrix_chain_order_recursive(p, k+1, j) + p[i-1]*p[k]*p[j];
            if (q < m[i][j]) {
                m[i][j] = q;
            }
        }
        return m[i][j];
    }
    var n = p.length - 1;
    var m = zeros([n, n]);
    var ret = matrix_chain_order_recursive(p, i, j);
    return ret;
}


function memoized_matriz_chain(p) {
    var n = p.length - 1;
    var m = zeros([n, n]);
    for (var i=0; i<n; i++) {
        for (var j=0; j<n; j++) {
            m[i][j] = Number.POSITIVE_INFINITY;
        }
    }
    lookup_chain(m, p, 0, n-1);
    return m;
}

// Will lookup to see if the sub problem has been solved previously
function lookup_chain(m, p, i, j) {
    if (m[i][j] < Number.POSITIVE_INFINITY) {
        return m[i][j];
    }
    
    if (i == j) {
        m[i][j] = 0;
    } else {
        for (var k=i; k<j; k++) {
            var q = lookup_chain(m, p, i, k) + lookup_chain(m, p, k+1, j) + p[i]*p[k+1]*p[j+1];
            if (q < m[i][j]) {
                m[i][j] = q;
            }
        }
    }
    return m[i][j];
}



function print_optimal_parens(s, i, j) {
    if (i === j) {
        process.stdout.write("A" + String(i));
    } else {
        process.stdout.write("(");
        print_optimal_parens(s, i, s[i][j]);
        print_optimal_parens(s, s[i][j] + 1, j);
        process.stdout.write(")");
    }
}


function zeros(dims) {
    var array = [];
    for (var i = 0; i < dims[0]; ++i) {
        array.push(dims.length == 1 ? 0 : zeros(dims.slice(1)));
    }
    return array;
}


var A = [[3], [2]];
var B = [[4, 1, 5]];
console.log(matrix_multiply(A, B));

var p = [30, 35, 15, 5, 10, 20, 25];
console.log(matrix_chain_order(p));

// does not use solutions to sub porblems previously found, much slower
console.log(matrix_recursive_wrapper(p, 3, 4));

// memoized version where previous solutions are saved
console.log(memoized_matriz_chain(p))
