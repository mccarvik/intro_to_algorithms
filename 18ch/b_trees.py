"""
script to simulate B-Tree algorithms
https://gist.github.com/natekupp/1763661
"""
import pdb


class BTreeNode(object):
    """A B-Tree Node.

    attributes
    =====================
    leaf : boolean, determines whether this node is a leaf.
    keys : list, a list of keys internal to this node
    c : list, a list of children of this node
    """
    def __init__(self, leaf=False):
        self.leaf = leaf
        self.keys = []
        self.c = []

    def __str__(self):
        if self.leaf:
            return "    Leaf BTreeNode with {0} keys\n\tK:{1}\n".format(len(self.keys), self.keys)
        msg = "Internal BTreeNode with {0} keys, {1} children\n\tK:{2}\n\n".format(len(self.keys), len(self.c), self.keys)
        for child in self.c:
            msg += child.__str__() + "\n"
        return msg


class BTree(object):
    """
    Class representing a B Tree
    """
    def __init__(self, t):
        self.root = BTreeNode(leaf=True)
        self.t = t

    def insert(self, k):
        """
        Insert a value k into the B-Tree
        """
        r = self.root
        if len(r.keys) == (2*self.t) - 1:
            # keys are full, so we must split
            s = BTreeNode()
            # set root to new node
            self.root = s
            # former root is now 0th child of new root s
            s.c.insert(0, r)
            self._split_child(s, 0)
            # Now room in tree insert node
            self._insert_nonfull(s, k)
        else:
            # if tree isn't full just add node
            self._insert_nonfull(r, k)

    def _insert_nonfull(self, x, k):
        i = len(x.keys) - 1
        if x.leaf:
            # if x is a leaf, insert k into x
            x.keys.append(0)
            while i >= 0 and k < x.keys[i]:
                x.keys[i+1] = x.keys[i]
                i -= 1
            x.keys[i+1] = k
        else:
            # determines the child to continue the recursion
            while i >= 0 and k < x.keys[i]:
                i -= 1
            i += 1
            # if a full child then need to split
            if len(x.c[i].keys) == (2*self.t) - 1:
                self._split_child(x, i)
                if k > x.keys[i]:
                    i += 1
            # Recurse through again in appropriate sub tree
            self._insert_nonfull(x.c[i], k)

    def _split_child(self, x, i):
        # x node to be split
        t = self.t
        # y is x's ith child
        y = x.c[i]
        # create new empty node
        z = BTreeNode(leaf=y.leaf)

        # slide all children of x to the right and insert empty node at i+1.
        x.c.insert(i+1, z)
        # take middle key of node to be split and make it key of new node
        x.keys.insert(i, y.keys[t-1])

        # keys of z are t to 2t - 1,
        # y is then 0 to t-2
        z.keys = y.keys[t:(2*t - 1)]
        y.keys = y.keys[0:(t-1)]

        # children of z are t to 2t els of y.c
        if not y.leaf:
            z.c = y.c[t:(2*t)]
            y.c = y.c[0:(t-1)]

    def __str__(self):
        r = self.root
        return r.__str__() + '\n'.join([child.__str__() for child in r.c])

    def search(self, k, x=None):
        """Search the B-Tree for the key k.

        args
        =====================
        k : Key to search for
        x : (optional) Node at which to begin search. Can be None, in which case the entire tree is searched.

        """
        if isinstance(x, BTreeNode):
            i = 0
            while i < len(x.keys) and k > x.keys[i]:    # look for index of k
                i += 1
            if i < len(x.keys) and k == x.keys[i]:       # found exact match
                return (x, i)
            elif x.leaf:
                # no match in keys, and is leaf ==> no match exists
                return None
            # search children
            return self.search(k, x.c[i])
        # no node provided, search root of tree
        return self.search(k, self.root)


if __name__ == '__main__':
    ROOT = BTree(3)
    ROOT.insert('B')
    ROOT.insert('G')
    ROOT.insert('C')
    ROOT.insert('K')
    ROOT.insert('E')
    ROOT.insert('Y')
    ROOT.insert('F')
    ROOT.insert('A')
    ROOT.insert('L')
    ROOT.insert('V')
    ROOT.insert('I')
    ROOT.insert('J')
    ROOT.insert('X')
    ROOT.insert('D')
    ROOT.insert('Z')
    ROOT.insert('U')
    ROOT.insert('R')
    ROOT.insert('S')
    ROOT.insert('T')
    


    # search feature
    # ROOT.search('G')
    print(ROOT)
