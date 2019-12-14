import sys
import json

def get2(x,y):
    return {"a":x+y}

def mydecode(de):
    uc = json.loads(de)
    return uc

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




