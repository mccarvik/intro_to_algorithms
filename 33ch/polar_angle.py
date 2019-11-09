import math
import random


def sort_by_polar_angle(p0, p):
    a = []
    for i in range(len(p)):
        a.append(math.atan2(p[i][1] - p0[1], p[i][0] - p0[0]))
    a = map(lambda x: x % (math.pi * 2), a)
    p = sorted(zip(a, p))
    # return map(lambda x: x[1], p)
    return p


def random_point():
    return (random.randint(0, 100), random.randint(0, 100))

    
for _ in range(10):
    n = random.randint(1, 100)
    p0 = random_point()
    p = [random_point() for _ in range(n)]
    s = sort_by_polar_angle(p0, p)
    print(s)