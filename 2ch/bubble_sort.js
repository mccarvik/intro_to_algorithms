function bubble_sort(A) {
    
    for (var i=0; i < A.length; i++) {
        for (var j=A.length; j > i; j--) {
            if (A[j] < A[j-1]) {
                var holder = A[j];
                A[j] = A[j-1];
                A[j-1] = holder;
                console.log(A);
            }
        }
    }
    return A;
}

var arr = [5, 2, 4, 7, 1, 3, 2, 6];
console.log(bubble_sort(arr));