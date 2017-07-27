var rand_funcs = require('../5ch/rand_funcs.js');

function count_sort(A, k) {
    var C = [];
    var B = [];
    for (var j=0; j < A.length; j++) {
        C[A[j]] = C[A[j]] + 1;
    }
    
    for (var i=0; i < k; i++) {
        C[i] = C[i] + C[i-1];
    }
    
    for (var j=A.length; j > -1 ; j--) {
        B[C[A[j]]] = A[j];
        C[A[j]]--;
    }
    
    return B;
}

var list = rand_funcs.rand_list(20,0,100);
console.log(list);
console.log(count_sort(list,list.length));