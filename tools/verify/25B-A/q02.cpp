#include <iostream>
#include <vector>
using namespace std;
template<typename U>
void f(U);

template<typename T>
class A {
private:
   T x;

public:
   A(T x1) : x(x1) {}

   template<typename U>
   friend void f(U);
};

template<typename U>
void f(U u) {
   A<int> obj1(5);
   A<U> obj2(u);
   cout << obj1.x;
       cout << obj2.x;
}

int main() {
   f(3.14);
   f("test");
   return 0;
}
