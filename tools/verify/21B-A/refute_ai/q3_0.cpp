class A {
public:
    A(int a, int b = 3) { x = a; y = b; }
    int x,y;
};


int main() {
    A a1;
    A a2(2);
    A a3(2, 3);
    A a4(2, 3, 4);
    A a5=a3;
    a3 = a2;
}
