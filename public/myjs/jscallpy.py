import sys
import json
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

def get1():
  # Data for plotting
    t = np.arange(0.0, 2.0, 0.01)
    s = 1 + np.sin(2 * np.pi * t)

    fig, ax = plt.subplots()
    ax.plot(t, s)

    ax.set(xlabel='time (s)', ylabel='voltage (mV)',
           title='About as simple as it gets, folks')
    ax.grid()

    fig.savefig("test.png")
    plt.show()
    return "plot showed"

def get2(x,y):
    a=np.arange(15).reshape(3,5)
    return a.tolist()

def evalarg(args):
     x=[]
     for i in args:
        try:
            x.append(json.loads(i))
        except:
            x.append(i)
     return x


func=eval(sys.argv[1])
args=sys.argv[2:]
x=evalarg(args)
result = func(*x)
print(result)




