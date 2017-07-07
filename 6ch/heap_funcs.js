var rand_funcs = require('../5ch/rand_funcs.js');
var priority_q = require('../6ch/priority_queue.js');

function max_heapify(A, i) {
    var l = left(i);
    var r = right(i);
    var largest;
    if (l <= A.length && A[l] > A[i]) {
        largest = l;
    } else {
        largest = i;
    }
    
    if (r <= A.length && A[r] > A[largest]) {
        largest = r;
    }
    
    if (largest != i) {
        var temp = A[i];
        A[i] = A[largest];
        A[largest] = temp;
        max_heapify(A, largest);
    }
    return A;
}

function build_max_heap(A) {
    var a_heap_size = A.length;
    for (var i=parseInt(a_heap_size/2, 10); i > -1; i--) {
        max_heapify(A, i);
    }
    // print_heap(A);
    return A;
}

function heapsort(A) {
    var final_A = [];
    A = build_max_heap(A);
    for (var i=A.length-1; i > 0; i--) {
        final_A.push(A[0]);
        A[0] = A[i];
        A = max_heapify(A.slice(0,i), 0);
        // A = A.slice(i, A.length).concat(max_heapify(A.slice(0,i), 0));
    }
    final_A.push(A[0]);
    print_heap(final_A);
    return final_A;
}

function print_heap(A) {
    var a = 1;
    console.log(A.slice(0,1));
    while (a < A.length) {
        console.log(A.slice(a, (a*2)+1));
        a = a * 2 + 1;
    }
}

function parent(i) {
    return parseInt(i/2, 10);
}

function left(i) {
    return 2 * i;
}

function right(i) {
    return 2 * i + 1;
}



// var list = rand_funcs.rand_list(10,0,10);
var list = [16, 14, 10, 9, 8, 7, 4, 3, 2, 1];
console.log(list);
// console.log(build_max_heap(list, 0));
list = heapsort(list, 0);
console.log(list);
var pq = new priority_q.MaxPriorityQueue(list);
console.log(pq.heap_extract_max());
pq.heap_increase_key(7, 15);
pq.heap_insert(8, 11);