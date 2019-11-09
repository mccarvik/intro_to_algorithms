from cmath import exp, pi
import pdb

def fft_recursive(x):
    N = len(x)
    if N <= 1: return x
    even = fft_recursive(x[0::2])
    odd =  fft_recursive(x[1::2])
    T= [exp(2j*pi*k/N)*odd[k] for k in range(int(N/2))]
    return [even[k] + T[k] for k in range(int(N/2))] + [even[k] - T[k] for k in range(int(N/2))]


def fft(x):
    """Compute the discrete Fourier Transform"""
    num = len(x)
    if num <= 1:
        return x
    even = fft(x[0::2])
    odd = fft(x[1::2])
    y = [0.] * num
    for k in range(num // 2):
        t = exp(-2j * pi * k / num) * odd[k]
        y[k] = even[k] + t
        y[k + num // 2] = even[k] - t
    return y

if __name__ in '__main__':
    LIST = [1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0]
    print(' '.join("{}".format(f) for f in fft(LIST)))
    print(' '.join("{}".format(f) for f in fft_recursive(LIST)))
