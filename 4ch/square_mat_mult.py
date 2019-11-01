"""
module for divide and conquer matrix mult algo
"""
import pdb

def square_mat_mult_loops(a_mat, b_mat):
    """
    iterative solutuon
    """
    rows = len(a_mat)
    c_mat = [[0 for x in range(rows)] for y in range(rows)] 
    for i in range(rows):
        for j in range(rows):
            c_mat[i][j] = 0
            for k in range(rows):
                c_mat[i][j] += a_mat[i][k] * b_mat[k][j]
                print(c_mat)
    return c_mat
    

if __name__ == '__main__':
    A_MAT = [[1, 2], [3, 4]]
    B_MAT = [[5, -1], [3, -2]]
    print(square_mat_mult_loops(A_MAT, B_MAT))