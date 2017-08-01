var rand_funcs = require('../5ch/rand_funcs.js');

function radix_sort(A, d) {
    for (var i=d-1; i>-1; i--) {
        console.log(A)
        A = bubble_sort(A, i)
    }
    return A
}


function bubble_sort(A, d) {
    for (var i=0; i < A.length; i++) {
        for (var j=A.length-1; j > i; j--) {
            if (parseInt(A[j].toString()[d]) < parseInt(A[j-1].toString()[d])) {
                var holder = A[j];
                A[j] = A[j-1];
                A[j-1] = holder;
                // console.log(A);
            }
        }
    }
    return A;
}


var list = rand_funcs.rand_list(20,10,99);
console.log('Original List: ' + list);
console.log(radix_sort(list, 2));