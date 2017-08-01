var rand_funcs = require('../5ch/rand_funcs.js');

function minmax(A) {
    var mn = A[0];
    var mx = A[0];
    
    for (var i=1; i < A.length; i++) {
        if (A[i] < mn){
            mn = A[i];
        }
        
        if (A[i] > mx){
            mx = A[i];
        }
    }
    return [mn, mx];
}


function randomized_select(A, p, r, i) {
    if (p==r) {
        return A[p];
    }
    
    var q = randomized_partition(A, p, r);
    var k = q - p + 1;
    if (i == k) {
        return A[q];
    } else if (i < k) {
        return randomized_select(A, p, q-1, i );
    } else {
        return randomized_select(A, q+1, r, i-k);
    }
}

function randomized_partition(A, p, r) {
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

function select(A, i) {
    if (A.length === 1) {
        return A[0];
    }
    
    var B = [];
    for (var j=0; j+5<A.length; j=j+5) {
        B.push(A.slice(j,j+5));
    }
    B.push(A.slice(j));
    console.log(B);
    
    var meds = [];
    for (var j=0; j<B.length; j++) {
        B[i] = bubble_sort(B[i]);
        meds.push(B[i][2]);
    }
    
    // var med = bubble_sort(meds)[(meds.length-1)/2];
    
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

var list = rand_funcs.rand_list(25,10,99);
console.log('Original List: ' + list);
// console.log(minmax(list));
// console.log(randomized_select(list, 0, 20, 2))
console.log(select(list, 3))