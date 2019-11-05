def APSP_Johnson(graph):
    """
    Applies Johnson's to compute all-pairs
    shortest paths.
    """
    n = graph.numVertices()
    for v in graph.vertices():
        graph.addDirectedEdge(n, v, 0)
        
    h, _ = BellmanFord(graph, n)

    del graph.adjacent[n]
    for v in graph.vertices():
        del graph.weight[(n, v)]

    if h == None:
        return None

    for (u, v) in graph.edges():
        graph.weight[(u, v)] += h[u] - h[v]

    dst = [None for u in range(n)]
    nxt = [None for u in range(n)]

    for u in graph.vertices():
        dst[u], nxt[u] = Dijkstra(graph, u)

    for u in graph.vertices():
        for v in graph.vertices():
            delta_h = h[u] - h[v]
            dst[u][v] -= delta_h
            if (u, v) in graph.weight:
                graph.weight[(u,v)] -= delta_h

    return (dst, nxt)


def Dijkstra(graph, s):
    """
    Applies Dijkstra to compute single-source
    shortest paths.
    """
    dist = [float('inf') for v in graph.vertices()]
    parent = [None for v in graph.vertices()]

    queue = Min_Heap()
    queue.insert(0, s)

    while queue:
        d, u = queue.extract_min()
        dist[u] = d

        for v in graph.adjacent[u]:
            new_dist = d + graph.weight[(u,v)]

            if v not in queue:
                if new_dist < dist[v]:
                    queue.insert(new_dist, v)
                    parent[v] = u

            elif new_dist < queue.key(v):
                queue.decrease_key(v, new_dist)
                parent[v] = u

    return (dist, parent)


def BellmanFord(graph, s):
    """
    Applies Bellman-Ford to compute single-source
    shortest paths.
    """
    dst = [float('inf') for v in graph.vertices()]
    pnt = [None for V in graph.vertices()]

    dst[s] = 0
    numRelaxations = graph.numVertices()-1
    for relaxation in range(numRelaxations):
        for (u, v) in graph.edges():
            new_dst = dst[u] + graph.weight[(u,v)]
            if new_dst < dst[v]:
                dst[v] = new_dst
                pnt[v] = u 

    if any(dst[u] + graph.weight[(u,v)] < dst[v] for (u, v) in graph.edges()):
        return (None, None)
    
    return (dst, pnt)


def showResults(graph, dst, pointer):
    """
    Shows all-pairs shortest paths information.
    """
    if dst == None:
        print(None)
        return

    print("Distances:")
    for (v, row) in zip(graph.vertices(), dst):
        print(f"{v}: {row}")

    print("\nPath Pointers:")
    for (v, row) in zip(graph.vertices(), pointer):
        print(f"{v}: {row}")


if __name__ == '__main__':
    from graph import Graph
    from heap import Min_Heap

    graph = Graph('ex_graph.txt')
    print(f"\nGraph:\n{graph}")

    print("\n\nJohnson")
    print("-"*25)
    dst, prev = APSP_Johnson(graph)
    showResults(graph, dst, prev)
    print()
