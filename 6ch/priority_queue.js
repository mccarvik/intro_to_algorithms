
exports.MaxPriorityQueue = function (A) {
    this.A = A;
    
    this.heap_max = function() {
        return this.A[0];
    };
    
    this.heap_extract_max = function() {
        if (this.A.length < 1) {
            console.log("This is an error");
        }
        var max = this.A[0];
        this.A[0] = this.A[this.A.length-1];
        this.A = this.max_heapify(this.A.slice(0,this.A.length-1), 0);
        this.print_heap();
        return max;
    };
    
    this.heap_increase_key = function(i, k) {
        if (this.A[i] > k) {
            console.log("This is an error, key is smaller than value");
        }
        
        this.A[i] = k;
        while (i > 0 && this.A[this.parent(i)] < this.A[i]) {
            var temp = this.A[i];
            this.A[i] = this.A[this.parent(i)];
            this.A[this.parent(i)] = temp;
            i = this.parent(i);
        }
        this.print_heap();
    };
    
    this.heap_insert = function(i, k) {
        this.A.push(-1);
        this.heap_increase_key(this.A.length-1, k);
    };
    
    this.print_heap = function() {
        var a = 1;
        console.log(this.A.slice(0,1));
        while (a < this.A.length) {
            console.log(this.A.slice(a, (a*2)+1));
            a = a * 2 + 1;
        }
        console.log("\n");
    }
    
    this.max_heapify = function(A, i) {
        var l = this.left(i);
        var r = this.right(i);
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
            this.max_heapify(A, largest);
        }
        return A;
    };
    
    this.left = function(i) {
        return 2 * i;
    };

    this.right = function(i) {
        return 2 * i + 1;
    };
    
    this.parent = function(i) {
        return parseInt(i/2, 10);
    };
    
};