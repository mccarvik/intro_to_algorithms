var rand_funcs = require('../5ch/rand_funcs.js');

function quicksort (A, p, r) {
    if (p < r) {
        var q = partition(A, p, r);
        A = quicksort(A, p, q-1);
        A = quicksort(A, q+1, r);
    }
    return A;
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
console.log(list);
console.log(quicksort(list, 0, list.length-1));