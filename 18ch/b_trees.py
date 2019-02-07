"""
script to simulate B-Tree algorithms
"""

# sets the static value of t to split on
SPLIT_T = 4

class BTree(object):
    """
    class to represent a b_tree
    """
    def __init__(self):
        """
        Constructor
        """
        self.leaf = True
        self.n = 0
        self.val = None
        self.chd = []

    def search(self, x, k):
        """
        Function to search trhough B-Tree
        """
        pass

    def split_child(self, x, i):
        """
        Splits the node x, on the ith child
        """
        z = BTree()
        y = x.chd[i]
        z.leaf = y.leaf
  
    def insert(self, k):
        """
        Inserts a node into a tree
        """
        pass


if __name__ == '__main__':
    ROOT = BTree()
    print(ROOT)
