import pdb

def basic_matching(t, p):
    n = len(t)
    m = len(p)
    pdb.set_trace()
    for ind_c in range(n-m):
        if p[0:m] == t[ind_c:ind_c+m]:
            print("pattern occurs with shift {}".format(ind_c))


def compute_prefix_function(p):
    m = len(p)
    p = ' ' + p
    pi = [0] * (m + 1)
    pi[1] = 0
    k = 0
    for q in range(2, m + 1):
        while k > 0 and p[k + 1] != p[q]:
            k = pi[k]
        if p[k + 1] == p[q]:
            k += 1
        pi[q] = k
    return pi[1:]


def compute_transition_function(p, s):
    m = len(p)
    d = {}
    for q in range(m + 1):
        for a in s:
            k = min(m + 1, q + 2)
            while k > 0:
                k -= 1
                if p[:k] == (p[:q] + a)[-k:]:
                    break
            d[(q, a)] = k
    return d

if __name__ == '__main__':
    basic_matching("abcdefghi", "def")