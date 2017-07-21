var rand_funcs = require('../5ch/rand_funcs.js');

function quicksort (A, p, r) {
    console.log(A);
    if (p < r) {
        // var q = partition(A, p, r);
        var q = random_partition(A, p, r);
        A = quicksort(A, p, q-1);
        A = quicksort(A, q+1, r);
    }
    return A;
}

function random_partition(A, p, r) {
    var i = rand_funcs.rand_list(1,p,r)[0];
    var temp = A[r];
    A[r] = A[i];
    A[i] = temp;
    return partition(A, p, r)
}

function partition(A, p, r) {
    var x = A[r];
    var i = p - 1;
    var temp;
    for (var j=p; j < r; j++) {
        if (A[j] <= x) {
            i = i + 1;
            temp = A[i];
            A[i] = A[j];
            A[j] = temp;
        }
    }
    temp = A[i+1];
    A[i+1] = A[r];
    A[r] = temp;
    return i + 1;
}

var list = rand_funcs.rand_list(20,0,100);
console.log(quicksort(list, 0, list.length-1));