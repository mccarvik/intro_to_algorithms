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

// Each interviewee has 1/i chance of being better than the candidates before them
// On average we hire Sigma : 1/ i, for 1 to i-1, 
// = ln(n) hires

var list = rand_funcs.rand_list(10,0,10);
console.log(hire_assistant(list));


console.log(list);
var new_list = rand_funcs.randomize_in_place(list)
console.log(new_list);

