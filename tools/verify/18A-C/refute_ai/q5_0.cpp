class X {
    friend class Y;
    int a;
    void f(Y y) { y.a = 1; }
};
class Y {
    int a;
    void f(X x) { x.a = 1; }
};
