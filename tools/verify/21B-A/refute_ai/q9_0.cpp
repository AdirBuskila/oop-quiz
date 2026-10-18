class A {
public:
    A(int i=0) { na = i; }
protected:
    int na;
};

class B : private A {
public:
    B(int i, int j) :A(j) { nb = i; }
    int f() { return na; }
protected:
    int nb;
};

class C : private B {
public:
    C(int i, int j, int k) : B(j, k) {
        nc = i;
    }
    int f() {
        int i = nb;
        return na;
    }
protected:
    int nc;
};
