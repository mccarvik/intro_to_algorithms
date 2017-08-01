var rand_funcs = require('../5ch/rand_funcs.js');

// Also known as bin sort

function bucket_sort(A) {
    var n = A.length;
    var B = [];
    for (var i=0; i < A.length; i++) {
        if (B[Math.floor(n * A[i])] === undefined) {
            B[Math.floor(n * A[i])] = [A[i]];
        } else {
            B[Math.floor(n * A[i])].push(A[i]);
        }
    }
    
    for (var i=0; i < B.length; i++) {
        if (B[i] !== undefined) {
            B[i] = bubble_sort(B[i]);
        }
    }
    
    var C = []
    for (var i=0; i < B.length; i++) {
        if (B[i] !== undefined) {
            C = C.concat(B[i]);
        }
    }
    return C;
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

var list = rand_funcs.rand_float_list(10,0,1);
console.log('Original List: ' + list);
console.log(bucket_sort(list));