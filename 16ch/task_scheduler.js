function task_sched(C) {
    var A = new Array(C.length).fill(0);
    var tasks_left = []
    for (var i=0; i<C.length; i++) {
        var fin_in_time = false;
        // grab task that has the highest cost
        for (var j=C[i][1]; j >= 0; j--) {
            if (A[j] === 0) {
                A[j] = C[i];
                fin_in_time = true;
                break;
            }
        }
        
        if (!fin_in_time) {
            tasks_left.push(C[i])
        }
        
    }
    
    for (var i=0; i < tasks_left.length; i++) {
        for (var j=0; j < A.length; j++) {
            if (A[j] === 0) {
                A[j] = tasks_left[i];
                break;
            }
        }
    }
    return A;
}


// task_id, deadline, penalty if deadline is missed
// reorgnized in decreasing order of costs
var C = [
    [1, 3, 70],
    [2, 1, 60],
    [3, 3, 50],
    [4, 2, 40],
    [5, 0, 30],
    [6, 3, 20],
    [7, 5, 10],
];

var root = task_sched(C);
console.log(root);