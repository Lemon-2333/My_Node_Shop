import requests
def get():
    res=requests.get("http://127.0.0.1:8888")
    print(res.text)

def get_create():
    patch='create'
    firstname='ccccc'
    lastname='Test'
    res=requests.get(f"http://127.0.0.1:8888/{patch}?firstname={firstname}&lastname={lastname}")
    print(res.text)

def test_create():
    for i in range(5000):
        i=str(i)
        patch='create'
        firstname='nnnnn'+i
        lastname='Test'+i
        res=requests.get(f"http://127.0.0.1:8888/{patch}?firstname={firstname}&lastname={lastname}")
        print(res.text)

def get_user():
    patch='getuser'
    word="aaaaa"
    res=requests.get(f"http://127.0.0.1:8888/{patch}?word={word}")
    print(res.text)

if __name__=="__main__":
    mode = 4
    if mode == 1:
        get()
    elif mode == 2:
        get_create()
    elif mode == 3:
        test_create()
    elif mode == 4:
        get_user()
