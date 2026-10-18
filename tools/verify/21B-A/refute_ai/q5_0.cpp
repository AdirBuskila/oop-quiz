class A {
public:
    A(int i=0) { x = i;}
    A& f(int i) {
        x = 2 * i;
        return *this;
    }
    A* g(int i) {
        x = 2 + i;
        return this;
    }
    int x;
};

int main() {
    A a1;
    a1.f(5).g(4);
    (&a1)->g(3).x = 5;
    a1.f(2)->x = 6;
    a1.f(2).x.g(2);
    a1.g(3)->f(4);
}
