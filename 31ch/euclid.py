

def extended_euclid(a, b):
    if b == 0:
        return (a, 1, 0)
    (d, x, y) = extended_euclid(b, a % b)
    return (d, y, x - (a // b) * y)


def euclid(a, b):
    if b == 0:
        return a
    return euclid(b, a % b)


def modular_linear_equation_solver(a, b, n):
    d, x, y = extended_euclid(a, n)
    if b % d == 0:
        x0 = x * b / d % n
        return [(x0 + i * n / d) % n for i in range(d)]
    return []
        

def modular_exponentiation(a, b, n):
    i, d = 0, 1
    while (1 << i) <= b:
        if (b & (1 << i)) > 0:
            d = (d * a) % n
        a = (a * a) % n
        i += 1
    return d


if __name__ == '__main__':
    print(euclid(30, 21))
    print(extended_euclid(30, 21))
    print(modular_linear_equation_solver(14, 30, 100))
    print(modular_exponentiation(7, 560, 561))