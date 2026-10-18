class X {
public:
    X(int i = 0) {
        p = new int[1];
        *p = i;
    }
    ~X() { delete p; }
    int* p;
    int f(X x) { return *(x.p); }
};
int main() {
    X x1(1); X x2(2); int k;
    x2 = x1;
    k = x2.f(x1);
}
