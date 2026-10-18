class A {
        int x;
public:
        A(int i = 0) { x = i; }
};
class B : private A {
        int y;
public:
        B(int i = 0, int j = 0) {
                x = i;
                y = j;
        }
};
class C : public B {
        int z;
public:
        C(int i = 0, int j = 0, int k = 0) {
                z = i;
                y = j;
                x = k;
        }
};
