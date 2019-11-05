import random
import unittest
import pdb


class DisjointSetForest:
    def __init__(self, n):
        self.p = list(range(n))

    def union(self, x, y):
        self.link(self.find_set(x), self.find_set(y))

    def link(self, x, y):
        self.p[x] = y

    def find_set(self, x):
        if x != self.p[x]:
            self.p[x] = self.find_set(self.p[x])
        return self.p[x]

    def display(self):
        print('Parent: ' + str(self.p))


def off_line_minimum(q, n):
    pos = [-1] * (n + 1)
    m = 0
    for v in q:
        if v == 'E':
            m += 1
        else:
            pos[v] = im = m
    pdb.set_trace()
    ds = DisjointSetForest(m + 1)
    extracted = [None] * m
    for i in range(1, n + 1):
        j = ds.find_set(pos[i])
        if j < m:
            extracted[j] = i
            ds.link(j, j + 1)
    return extracted


class ProblemTestCase(unittest.TestCase):

    def test_case(self):
        q = [4, 8, 'E', 3, 'E', 9, 2, 6, 'E', 'E', 'E', 1, 7, 'E', 5]
        n = 9
        e = off_line_minimum(q, n)
        self.assertEqual(e, [4, 3, 2, 6, 8, 1])

    def test_random(self):
        for _ in range(1000):
            n = random.randint(10, 1000)
            q = list(range(1, n + 1))
            random.shuffle(q)
            m = random.randint(10, 1000)
            for _ in range(m):
                p = random.randint(0, len(q))
                if p == len(q):
                    q.append('E')
                elif p == 0:
                    q = ['E'] + q
                else:
                    q = q[:p] + ['E'] + q[p:]
            expect = [None] * m
            j = 0
            nums = []
            for v in q:
                if v == 'E':
                    if len(nums) > 0:
                        nums.sort()
                        expect[j] = nums[0]
                        del nums[0]
                    j += 1
                else:
                    nums.append(v)
            self.assertEqual(off_line_minimum(q, n), expect)


def connected_components(verts, edges):
    sets = []
    for ind_v in verts:
        sets.append(set(ind_v))
    
    for ind_e in edges:
        # find the sets
        set1 = find_set(sets, ind_e[0])
        set2 = find_set(sets, ind_e[1])
        if set1 != set2:
            # join the sets and remove them individually from the list
            new_set = set1.union(set2)
            sets.remove(set1)
            sets.remove(set2)
            # and add the union
            sets.append(new_set)
    return sets

    
def same_component(sets, ed1, ed2):
    if find_set(sets, ed1) == find_set(sets, ed2):
        return True
    return False

def find_set(sets, edge):
    for ind_s in sets:
        if edge in ind_s:
            return ind_s
    return None

if __name__ == '__main__':
    unittest.main()    
    # VERTICES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    # EDGES = [('B', 'D'), ('E', 'G'), ('A', 'C'), ('H','I'), ('A', 'B'), ('E', 'F'), ('B', 'C')]
    # print(connected_components(VERTICES, EDGES))