from threading import Thread


# A thread class to produce Fibonacci Numbers
class FibonacciThread(Thread):
    def __init__(self):
        Thread.__init__(self)
       
    #override the run method to define thread body   
    def run(self):
        print("Fibonacci Thread Started")
        firstTerm   = 0
        secondTerm  = 1
        nextTerm    = 0

        for i in range(0,20):
            if ( i <= 1 ):
                nextTerm = i
            else:
                nextTerm    = firstTerm + secondTerm
                firstTerm   = secondTerm
                secondTerm  = nextTerm
            print(nextTerm)
        print("Fibonacci Thread Ending")           

print("Main Thread Started")
MyFibonacciThread =  FibonacciThread()    
MyFibonacciThread.start()
print("Main Thread Started to wait for the Fibonacci Thread to complete");
MyFibonacciThread.join()
print("Main Thread Resumed");
print("Main Thread Ending");