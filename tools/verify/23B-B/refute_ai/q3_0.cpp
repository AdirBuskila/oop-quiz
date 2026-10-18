class X {
public:
    int n1;
};
class Y : protected X {
public:
    int n2;
};
class Z : public Y {
public:
    int n3;
    friend void g();
    void f() {
        n3 = n1;
        n3 = n2;
    }
};
void g() { Y y1; Z z1;
    y1.n1 = 0;
    y1.n2 = 0;
    z1.n1 = 0;
    z1.n2 = 0;
}
int main() {
    Z z1;
    z1.n2 = 0;
    z1.n1 = 0;
    return 0;
}
