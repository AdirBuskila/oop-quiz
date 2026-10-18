class X {
    friend void f(X x);
public:
    int a;
private:
    int b;
};
void f(X x) {
    x.a = 1;
    x.b = 1;
}
void f(X x, int k) {
    x.a = 1;
    x.b = 1;
}
