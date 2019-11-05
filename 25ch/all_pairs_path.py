import unittest
import pdb
import copy
import numpy as np

def print_matrix(m):
    print(np.array(m))


def extend_shortest_paths(m, w):
    n = len(m)
    ll = [[1e100 for _ in range(n)] for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                # extends the path by one link to see if it is shorter than 
                # the current shortest value
                ll[i][j] = min(ll[i][j], m[i][k] + w[k][j])
    return ll


def slow_all_pairs_shortest_paths(w):
    n = len(w)
    m = w
    for _ in range(n - 2):
        print_matrix(m)
        m = extend_shortest_paths(m, w)
    return m


def fast_all_pairs_shortest_paths(w):
    n = len(w)
    m = 1
    while m < n - 1:
        w = extend_shortest_paths(w, w)
        m *= 2
    return w


def floyd_warshall(w):
    n = len(w)
    d = copy.deepcopy(w)
    for k in range(n):
        dd = copy.deepcopy(d)
        print_matrix(dd)
        for i in range(n):
            for j in range(n):
                dd[i][j] = min(d[i][j], d[i][k] + d[k][j])
        d = dd
    return d
    
def transitive_closure(w, inf):
    n = len(w)
    d = copy.deepcopy(w)
    for i in range(n):
        for j in range(n):
            if i == j or w[i][j] != inf:
                d[i][j] = 1
            else:
                d[i][j] = 0
    for k in range(n):
        dd = copy.deepcopy(d)
        for i in range(n):
            for j in range(n):
                if d[i][j] or (d[i][k] and d[k][j]):
                    dd[i][j] = 1
                else:
                    dd[i][j] = 0
        d = dd
    return d


class ProblemTestCase(unittest.TestCase):

    def test_case(self):
        inf = 1e100
        w = [[0, inf, inf, inf, -1, inf],
             [1, 0, inf, 2, inf, inf],
             [inf, 2, 0, inf, inf, -8],
             [-4, inf, inf, 0, 3, inf],
             [inf, 7, inf, inf, 0, inf],
             [inf, 5, 10, inf, inf, 0]]
        self.assertEqual(slow_all_pairs_shortest_paths(w),
                         fast_all_pairs_shortest_paths(w))


if __name__ == '__main__':
    # unittest.main()
    inf = 1000
    # W = [[0, inf, inf, inf, -1, inf],
    #      [1, 0, inf, 2, inf, inf],
    #      [inf, 2, 0, inf, inf, -8],
    #      [-4, inf, inf, 0, 3, inf],
    #      [inf, 7, inf, inf, 0, inf],
    #      [inf, 5, 10, inf, inf, 0]]
    W = [[0, 3, 8, inf, -4],
         [inf, 0, inf, 1, 7],
         [inf, 4, 0, inf, inf],
         [2, inf, -5, 0, inf],
         [inf, inf, inf, 6, 0]]
    # W = [[0, inf, inf, inf, -1, inf],
    #      [1, 0, inf, 2, inf, inf],
    #      [inf, 2, 0, inf, inf, -8],
    #      [-4, inf, inf, 0, 3, inf],
    #      [inf, 7, inf, inf, 0, inf],
    #      [inf, 5, 10, inf, inf, 0]]
    W = [[0, inf, inf, inf],
         [inf, 0, 1, 1],
         [inf, 1, 0, inf],
         [1, inf, 1, 0]]
    # print_matrix(slow_all_pairs_shortest_paths(W))
    # print_matrix(fast_all_pairs_shortest_paths(W))
    # print_matrix(floyd_warshall(W))
    print_matrix(transitive_closure(W, inf))
