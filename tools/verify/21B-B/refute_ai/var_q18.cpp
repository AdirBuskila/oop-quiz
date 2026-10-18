struct B;
struct A { B* pb; };
struct B { A* pa; };
int main(){ A a; B b; a.pb=&b; b.pa=&a; }
