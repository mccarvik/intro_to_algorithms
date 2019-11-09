'''
Vertex Cover Problem - Greedy approach for finding optimal solution
'''

# case 1
case_1 = {'a': ['b', 'c'], 'b': ['a', 'c', 'd', 'e'], 'c': ['a', 'b', 'd'], 
        'd': ['c', 'b', 'e'], 'e': ['b', 'd']}

# case 2
case_2 = {'a': ['f'], 'b': ['f'], 'c': ['f'], 
        'd': ['f'], 'e': ['f'], 'f': ['a', 'b', 'c', 'd', 'e', 'g'], 'g': ['f']}

# case 3
case_3 = {'a': ['f'], 'b': ['f', 'c'], 'c': ['f', 'd', 'b'], 
        'd': ['f', 'c'], 'e': ['f'], 'f': ['a', 'b', 'c', 'd', 'e', 'g'], 'g': ['f']}

# case 4
case_4 = {'a': ['f'], 'b': ['f', 'c'], 'c': ['f', 'd', 'b'], 
        'd': ['f'], 'e': ['f'], 'f': ['a', 'b', 'c', 'd', 'e', 'g'], 'g': ['f']}

# case 5
case_5 = {'a': ['b', 'd'], 'b': ['a', 'c', 'd', 'e'], 'c': ['b', 'f', 'e'], 
        'd': ['a', 'b', 'e'], 'e': ['b', 'c', 'f'], 'f': ['c', 'e']}

# case 6
case_6 = {'a': ['d', 'b'], 'b': ['a', 'e', 'f', 'c'], 'c': ['b', 'd'], 
        'd': ['a', 'c', 'f', 'e'], 'e': ['b', 'd', 'f'], 'f': ['b', 'd', 'e']}

# case 7
case_7 = {'a': ['b','c'], 'b': ['a','c','d','e','f'], 'c': ['b','a'], 
        'd': ['b'], 'e': ['b'], 'f': ['b']}

# case 8
case_8 = {'a': ['b','c'], 'b': ['a','c','d'], 'c': ['b','a', 'e'], 
        'd': ['b','f','e'], 'e': ['d','c'], 'f': ['d']}

# case 9
case_9 = {'a': ['b', 'f'], 'b': ['a', 'c'], 'c': ['b', 'd'], 
        'd': ['c', 'a'], 'e': ['d', 'f'], 'f': ['e', 'a']}

# case 10
case_10 = {'a': ['b'], 'b': ['c'], 'c': ['d'], 
        'd': ['e'], 'e': ['f'], 'f': ['a']}

# case 11
case_11 = {'a': ['b', 'c', 'd', 'e', 'f'], 'b': ['c', 'a', 'd', 'e', 'f'], 'c': ['d', 'a', 'b', 'e', 'f'], 
        'd': ['e', 'a', 'b', 'c', 'f'], 'e': ['f', 'a', 'b', 'c', 'd'], 'f': ['a', 'b', 'c', 'd', 'e']}

# case 12
case_12 = {'a': ['b', 'c'], 'b': ['d', 'a'], 'c': ['a', 'e'], 
        'd': ['b', 'f', 'g'], 'e': ['h', 'i', 'j'], 'f': ['k', 'l', 'm', 'd'], 
        'g': ['n', 'o', 'p', 'd'], 'h': ['e'], 'i': ['e'], 'j': ['q', 'e'], 'k': ['f'], 'l': ['f'], 'm': ['f'],
        'n': ['g'], 'o': ['g'], 'p': ['g'], 'q': ['j']}

cases = [case_1, case_2, case_3, case_4, case_5, case_6, case_7, case_8, case_9, case_10, case_11, case_12]

class Node(object):
    def __init__(self, name):
        self.name = name
        self.adj_list = []
        self.degree = -1

class Edge(object):
    def __init__(self, node1, node2, weight=0):
        self.node1 = node1
        self.node2 = node2
        self.weight = weight

    def __str__(self):
        return 'Node 1: %s, Node 2: %s' % (self.node1.name, self.node2.name)

    def __repr__(self):
        return '**Node 1: %s, Node 2: %s**' % (self.node1.name, self.node2.name)

def name_of_highest_degree(nodes):
    h = -1
    k = None
    for key in nodes:
        if nodes[key].degree > h:
            h = nodes[key].degree
            k = nodes[key]

    return k

# create Edges and Nodes
def vertex_cover(edges, number):
    total_edges = 0
    nodes = {}
    cover = []

    for a in edges:
        n = Node(a)
        nodes[a] = n

    for n in edges:
        node = nodes[n]
        for e in edges[n]:
            edge = Edge(node, nodes[e])
            node.adj_list.append(edge)
            node.degree += 1
            total_edges += 1

    # Actual algorithm
    while total_edges > 0:
        pick_n = name_of_highest_degree(nodes)
        cover.append(pick_n)
        for key in nodes:
            curr_node = nodes[key]
            j = 0
            while True:
                if len(curr_node.adj_list) <= 0:
                    break

                if j >= len(curr_node.adj_list):
                    break

                edge = curr_node.adj_list[j]
                if edge.node2.name == pick_n.name:
                    curr_node.degree -= 1
                    del curr_node.adj_list[j]
                    total_edges -= 1
                    continue

                if edge.node1.name == pick_n.name:
                    del curr_node.adj_list[j]
                    total_edges -= 1
                    continue
                j += 1
        del nodes[pick_n.name]


    print('Case %d: ' % number, end='')
    for c in cover:
        print(c.name, end=' ')
    print()

for i in range(len(cases)):
    vertex_cover(cases[i], i + 1)
