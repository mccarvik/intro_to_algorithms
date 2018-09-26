
function lcs_length(X, Y) {
    var m = X.length+1;
    var n = Y.length+1;
    var b = zeros([m, n]);
    var c = zeros([m, n]);
    
    for (var i=1; i<m; i++) {
        for (var j=1; j<n; j++) {
            if (X[i-1] === Y[j-1]) {
                c[i][j] = c[i-1][j-1] + 1;
                b[i][j] = 'ul';
            } else if (c[i-1][j] >= c[i][j-1]) {
                c[i][j] = c[i-1][j];
                b[i][j] = 'u';
            } else {
                c[i][j] = c[i][j-1];
                b[i][j] = 'l';
            }
        }
    }
    print_lcs(b, X, X.length, Y.length);
    console.log();
    return [c, b];
}


function print_lcs(b, X, i, j) {
    if (i === 0 || j ===0) {
        return;
    }
    if (b[i][j] === 'ul') {
        print_lcs(b, X, i-1, j-1);
        if (X[i-1] === 0) {
            process.stdout.write('');
        } else {
            process.stdout.write(X[i-1]);
        }
    } else if (b[i][j] == 'u') {
        print_lcs(b, X, i-1, j);
    } else {
        print_lcs(b, X, i, j-1);
    }
}


function zeros(dims) {
    var array = [];
    for (var i = 0; i < dims[0]; ++i) {
        array.push(dims.length == 1 ? 0 : zeros(dims.slice(1)));
    }
    return array;
}


var X = ['A', 'B', 'C', 'B', 'D', 'A', 'B'];
var Y = ['B', 'D', 'C', 'A', 'B', 'A'];
console.log(lcs_length(X, Y));