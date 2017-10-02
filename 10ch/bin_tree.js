function Tree( data, left, right ) 
{   
    // pravite data 
    var data = data; 
    var leftChild = left; 
    var rightChild = right; 

    // public functions 
    this.getData = function()
    {
        return data;
    }

    this.left = function()
    {
        return leftChild; 
    }

    this.right = function()
    {
        return rightChild; 
    }

}