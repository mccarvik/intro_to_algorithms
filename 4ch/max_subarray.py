"""
Module for section 4.1 of chapter 4
"""
import pdb

def max_cross_sub_array(arr, low, mid, high):
    """
    Will take an array and find the maximum continuous sub array inside an array
    """
    left_sum = float('-inf')
    summ = 0
    max_left = low
    max_right = high
    
    
    # find the maximum sub array of the left, since the left must contain mid
    for i in range(mid, low, -1):
        summ += arr[i]
        if summ > left_sum:
            left_sum = summ
            max_left = i
    
    # find the maximum sub array of the right since the right must contatin mid
    right_sum = float('-inf')
    summ = 0
    for j in range(mid+1, high+1, 1):
        summ += arr[j]
        if summ > right_sum:
            right_sum = summ
            max_right = j
    if left_sum == float("-inf"):
        left_sum = 0
    if right_sum == float("-inf"):
        right_sum = 0
    return max_left, max_right, left_sum + right_sum
    

def find_max_subarray(arr, low, high):
    """
    recursive function to find the subarray with max sum
    """
    
    if high == low:
        # one item, return it, this is the base case
        return (low, high, arr[low])
    else:
        mid = int((low + high) / 2)
        # find the max of the left
        left_low, left_high, left_sum = find_max_subarray(arr, low, mid)
        # find the max of the right
        right_low, right_high, right_sum = find_max_subarray(arr, mid+1, high)
        # find the max across the mid
        cross_low, cross_high, cross_sum = max_cross_sub_array(arr, low, mid, high)
        
        if left_sum >= right_sum and left_sum >= cross_sum:
            return (left_low, left_high, left_sum)
        elif right_sum >= left_sum and right_sum >= cross_sum:
            return (right_low, right_high, right_sum)
        else:
            return (cross_low, cross_high, cross_sum)


if __name__ == '__main__':
    ARRAY = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
    print(find_max_subarray(ARRAY, 0, len(ARRAY)-1))