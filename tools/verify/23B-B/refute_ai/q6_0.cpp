class A {
    int x;
public:
    int f() { return x;}
    int& g() {return x;}
    int* h()  {return &x;}
};
