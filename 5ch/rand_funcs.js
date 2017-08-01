
// Randomization function
// Randomly generates numbers, sorts them, then applies the indices to randomly
// sort the original array
exports.permute_by_sorting = function (arr) {
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

// Randomization function
// randomly selects indices to reconstruct the list
exports.randomize_in_place = function (arr) {
    var ret_arr = [];
    
    while (arr.length > 0) {
        var i = parseInt(Math.random() * arr.length);
        ret_arr.push(arr[i]);
        arr.splice(i, 1);
    }
    return ret_arr
}



exports.rand_list = function (len, min, max) {
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

exports.rand_float_list = function (len, min, max) {
    var ret = [];
    var i = 0;
    while (i < len) {
        var val = (Math.random() * (max-min) + min);
        if (ret.indexOf(val) === -1) {
            ret.push(val);
            i++;
        }
    }
    return ret;
}