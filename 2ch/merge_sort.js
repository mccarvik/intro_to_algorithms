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
    if (p < r) {
        var q = Math.floor((p+r)/2);
        merge_sort(A, p, q);
        merge_sort(A, q+1, r);
        merge(A, p, q, r);
    }
    return A;
}

var arr = [5, 2, 4, 7, 1, 3, 2, 6];
console.log(merge_sort(arr, 0, arr.length))