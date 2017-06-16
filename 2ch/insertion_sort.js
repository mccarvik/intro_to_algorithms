function insertion_sort(A) {
    for (var j=1; j < A.length; j++) {
        var key = A[j];
        console.log(A);
        for (var i = j-1; i > -1 && A[i] > key; i--) {
            A[i+1] = A[i];
        }
        A[i+1] = key;
        
    }
    return A;
}

console.log(insertion_sort([5, 2, 4, 6, 1, 3]));
