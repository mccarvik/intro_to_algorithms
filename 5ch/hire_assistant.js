var rand_funcs = require('./rand_funcs.js');

function hire_assistant(arr) {
    var best = -1;
    var cost = 0;
    var interview_cost = 1;
    var hire_cost = 5;
    for (var i=0; i<arr.length; i++) {
        cost += interview_cost;
        if (arr[i] > best) {
            best = arr[i];
            cost += hire_cost;
        }
    }
    return cost;
}

function on_line_hire_assistant(k, arr) {
    var best = -1;
    var best_ind = -1;
    for (var i=0; i < k; i++) {
        if (arr[i] > best) { 
            best = arr[i];
            best_ind = i;
        }
    }
    
    for (var i=k; i < arr.length; i++) {
        if (arr[i] > best) {
            return i;
        }
    }
    
    // If best candidate was between 1 and k, we hire the last candidate
    return arr.length - 1;
}

// Each interviewee has 1/i chance of being better than the candidates before them
// On average we hire Sigma : 1/ i, for 1 to i-1, 
// = ln(n) hires

var list = rand_funcs.rand_list(20,0,100);
// console.log(hire_assistant(list));
console.log(list);
var ind = on_line_hire_assistant(6, list);
console.log(ind);
console.log(list[ind]);



