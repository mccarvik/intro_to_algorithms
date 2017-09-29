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
    return [i + 1, A];
}

function select(A, i) {
    var med_of_meds = getMedOfMeds(A);
    console.log("med of meds: " + med_of_meds);
    
    // get ind of med_of_meds
    var ind;
    for (var j=0; j<A.length; j++) {
        if (A[j] === med_of_meds) {
            ind = j;
            break;
        }
    }
    
    // put pivot in the back
    var temp = A[A.length-1];
    A[A.length-1] = A[ind];
    A[ind] = temp;
    
    var new_A = partition(A, 0, A.length-1);
    var k = new_A[0];
    console.log("k: " + k);
    console.log("i: " + i);
    new_A = new_A.slice(1,new_A.length);
    console.log("new A:" + new_A);
    
    if (k === 0) {
        console.log("here2");
    }
    
    if (i === k) {
        return A[k];
    } else if (i < k) {
        return select(A.slice(0,k), i);
    } else {
        console.log("here:" + A.slice(k,A.length));
        return select(A.slice(k,A.length), i-k);
    }
}

function getMedOfMeds(A, i) {
    // base case, will solve step 3 --> find median of medians
    if (A.length === 1) {
        return A[0];
    }
    
    var B = [];
    for (var j=0; j+5<A.length; j=j+5) {
        B.push(A.slice(j,j+5));
    }
    B.push(A.slice(j));
    console.log(B);
    
    // Step 2 find all medians
    var meds = [];
    for (var j=0; j<B.length; j++) {
        B[j] = bubble_sort(B[j]);
        meds.push(getMedian(B[j]));
    }
    
    return getMedOfMeds(meds, i);
}

function getMedian(list) {
    // By convention, take the lower median
    var mid = Math.floor((list.length-1) / 2);
    return list[mid];
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