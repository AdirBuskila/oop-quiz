class A {
public:
        A(int i = 0) { nap = i; }
        int nA;
};

class B : protected A {
public:
        B(int i = 0) { nB = i; }
        int nB;
};

class C : public B {
public:
        C(int i = 0) { nC = i; }
        int nC;
};

void f() {
        B b1;
        C c1;
        b1.nA = 8;
        b1.nB = 9;
        c1.nA = 10;
        c1.nB = 11;
}

int main() {
        f();
        return 0;
}
