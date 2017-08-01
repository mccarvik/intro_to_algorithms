var rand_funcs = require('../5ch/rand_funcs.js');

function count_sort(A, k) {
    // k = max of array
    var C = new Array(k+2).join('0').split('').map(parseFloat)
    var B = [];
    
    for (var j=0; j < A.length; j++) {
        C[A[j]] = C[A[j]] + 1;
    }
    
    console.log(C);
    
    for (var i=1; i < k+1; i++) {
        C[i] = C[i] + C[i-1];
    }
    
    console.log(C);
    for (var j=A.length-1; j > -1 ; j--) {
        B[C[A[j]]] = A[j];
        C[A[j]]--;
    }
    
    // remove empty first element
    B.shift()
    return B;
}

function bubble_sort(A) {
    for (var i=0; i < A.length; i++) {
        for (var j=A.length; j > i; j--) {
            if (A[j] < A[j-1]) {
                var holder = A[j];
                A[j] = A[j-1];
                A[j-1] = holder;
            }
        }
    }
    return A;
}

var list = rand_funcs.rand_list(10,0,15);
console.log(list);
console.log(count_sort(list, Math.max.apply(Math, list)));