// runs in exponential time, redoes work
function ineff_cut_rod(p, n) {
    if (n == 0) {
        return 0;
    }
    var q = Number.NEGATIVE_INFINITY;
    for (var i=1; i<=n; i++) {
        q = Math.max(q, p[i] + ineff_cut_rod(p, n-i));
    }
    return q;
}


// remembers work it has previously done
function memoized_cut_rod(p, n) {
    var r = {};
    for (var i=0; i<=n; i++) {
        r[i] = Number.NEGATIVE_INFINITY;
    }
    return memoized_cut_rod_aux(p, n, r);
}


function memoized_cut_rod_aux(p, n, r) {
    // weve seen this before
    if (r[n] >= 0) {
        return r[n];
    }
    
    var q;
    if (n === 0) {
        q = 0;
    } else {
        q = Number.NEGATIVE_INFINITY;
        for (var i=1; i<=n; i++) {
            q = Math.max(q, p[i] + memoized_cut_rod_aux(p, n-i, r));
        }
    }
    r[n] = q;
    return q;
}


function bottom_up_cut_rod(p, n) {
    var r = {};
    var s = {};
    r[0] = 0;
    for (var j=1; j<=n; j++) {
        var q = Number.NEGATIVE_INFINITY;
        for (var i=1; i<=j; i++) {
            // i is less than j so we know we already have the solution
            if (q < p[i] + r[j-i]) {
                q = Math.max(p[i] + r[j-i]);
                s[j] = i;
            }
        }
        r[j] = q;
    }
    return [r[n], s];
}


var len_px = {
    1: 1,
    2: 5,
    3: 8,
    4: 9,
    5: 10,
    6: 17,
    7: 17,
    8: 20,
    9: 24,
    10: 30
};
console.log(ineff_cut_rod(len_px, 8));
console.log(ineff_cut_rod(len_px, 10));

console.log(memoized_cut_rod(len_px, 8));
console.log(memoized_cut_rod(len_px, 10));

// will return the optimal number solution and a map
// map will indicate the length of rod to cut off, given this sized rod
console.log(bottom_up_cut_rod(len_px, 8));
console.log(bottom_up_cut_rod(len_px, 10));
