function greedy_iterative(a, s, f) {
    var n = s.length;
    var A = [a[0]];
    var k = 0;
    for (var i=0; i < n; i++) {
        if (s[i] >= f[k]) {
            A = A.concat([a[i]]);
            k = i;
        }
    }
    return A;
}

function greedy_recursive(a, s, f, k, n) {
    var m = k + 1;
    while (m <= n && s[m] < f[k]) {
        m++;
    }
    
    if (m <= n) {
        return [a[m]].concat(greedy_recursive(a, s, f, m, n))
    } else {
        return [];
    }
}


var tasks = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    [1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12],
    [4, 5, 6, 7, 9, 9, 10, 11, 12, 14, 16]];
    
console.log(greedy_iterative(tasks[0], tasks[1], tasks[2]));

// Need to add fictitious first activity to kick off call
tasks[0] = [0].concat(tasks[0]);
tasks[1] = [0].concat(tasks[1]);
tasks[2] = [0].concat(tasks[2]);
console.log(greedy_recursive(tasks[0], tasks[1], tasks[2], 0, tasks[0].length));
