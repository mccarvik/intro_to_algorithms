
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

// Randomization function
// Randomly generates numbers, sorts them, then applies the indices to randomly
// sort the original array
function permute_by_sorting(arr) {
    var unsorted = [];
    for (var i=0; i<arr.length; i++) {
        unsorted.push(Math.random() *  Math.pow(3, arr.length));
    }
    var ret_arr = [];
    var sorted = sort(unsorted);
    for (var i=0; i<sorted.length; i++) {
        ret_arr.push(arr[unsorted.indexOf(sorted[i])]);
    }
    return ret_arr;
}

function sort(arr) {
  return arr.concat().sort(compare);
}

function compare(a, b){
    if (a > b) { return 1; }
    else { return -1; }
}

function rand_list(len, min, max) {
    var ret = [];
    var i = 0;
    while (i < len) {
        var val = (parseInt(Math.random() * (max-min)) + min);
        if (ret.indexOf(val) === -1) {
            ret.push(val);
            i++;
        }
    }
    return ret;
}

var list = rand_list(10,0,10);
// console.log(list);
list = permute_by_sorting(list)
console.log(hire_assistant(list));

// Each interviewee has 1/i chance of being better than the candidates before them
// On average we hire Sigma : 1/ i, for 1 to i-1, 
// = ln(n) hires