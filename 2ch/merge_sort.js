function merge(A, p, q, r) {
    var L = A.slice(p, q);
    var R = A.slice(q, r);
    
    // Arbitrarily large number as sentinel --> assume infinity
    L.push(9999);
    R.push(9999);
    
    var i = 0; var j = 0;
    for (var k=p; k < r; k++) {
        console.log(A);
        if (L[i] <= R[j]) {
            A[k] = L[i];
            i++;
        } else {
            A[k] = R[j];
            j++;
        }
    }
}

function merge_sort(A, p, r) {
    
}

arr = [2, 4, 5, 7, 1, 2, 3, 6]
console.log(merge_sort(arr, 0, arr.length))