"""
Module for section 4.1 of chapter 4
"""
import pdb

def max_cross_sub_array(arr, low, mid, high):
    """
    recursvie function
    Will take an array and find the maximum continuous sub array inside an array
    """
    left_sum = float(-inf)
    summ = 0
    
    # find the maximum sub array of the left, since the left must contain mid
    for i in range(mid, low, -1):
        summ += arr[i]
        if summ > left_sum:
            left_sum = summ
            max_left = i
    
    # find the maximum sub array of the right since the right must contatin mid
    right_sum = float(-inf)
    summ = 0
    for j in range(mid+1, high, 1):
        summ += A[j]
        if summ > right_sum:
            right_sum = summ
            max_right = j
    return max_left, max_right, left_sum + right_sum
    
if __name__ == '__main__':
    ARRAY = [1]