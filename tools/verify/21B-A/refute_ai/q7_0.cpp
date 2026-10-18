class A {
public:
    A(int i) {x=i;}
    operator int() {return x;}
    int x;
};

int main()
{
    A a1(5); int i=3;
    A a2=i;
    i=a1;
    i=(int) a1;
    a1=(A)i;
}
