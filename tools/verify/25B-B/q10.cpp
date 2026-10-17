#include <iostream>
#include <vector>
using namespace std;
template<typename T>
void func(T a) {
   cout << "Generic template\n";
}

void func(int a) {
   cout << "Non-template overload\n";
}

int main() {
   func(3.14);
   func(int(3.14));
   return 0;
}
