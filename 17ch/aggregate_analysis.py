"""
Function for aggregate analysis, ch 17.1
"""

def multi_pop(stack, k):
    """
    pops k values from stack
    """
    for i_ct in range(k):
        stack.pop()
    return stack


def binary_inc(array):
    """
    performs a binary increment by 1
    """
    i_ct = 0
    while i_ct < len(array) and array[i_ct] == 1:
        array[i_ct] = 0
        i_ct += 1
    if i_ct < len(array):
        array[i_ct] = 1
    return array


def table_insert(T, x):
    """
    inserts into a table and resizes if necessary
    """
    if len(T) == 0:
        T = [0]
    if sum(T) == len(T):
        # extend size of the table where necessary: load factor 1/2
        T_new = [0] * 2 * len(T)
        for i in range(len(T)):
            T_new[i] = T[i]
        T = T_new
    # insert x in the next slot
    for i_ct in range(len(T)):
        if T[i_ct] == 0:
            T[i_ct] = x
            break
    print(T)
    return T


def table_delete(T):
    """
    deletes an item from the table and resizes if necessary
    """
    # table empty, nothing to delete
    if len(T) == 0:
        return T

    # otherwise delete the item
    for i_ct in range(len(T)-1, -1, -1):
        if T[i_ct] == 1:
            T[i_ct] = 0
            break

    # check if we should contract - load factor of 1/4
    if sum(T) < len(T) / 4:
        T_new = int(len(T) / 2) * [0]
        for i_ct in range(len(T_new)):
            T_new[i_ct] = T[i_ct]
        T = T_new
    print(T)
    return T


if __name__ == '__main__':
    # STK = [1, 2, 3, 4, 5, 6]
    # multi pop function
    # print(multi_pop(STK, 2))

    # increment analysis
    # array = [0] * 8
    # for inc in range(16):
    #     print(array)
    #     array = binary_inc(array)

    # Dynamic Tables
    T = []
    for i in range(20):
        T = table_insert(T, 1)

    for i in range(14):
        T = table_delete(T)
