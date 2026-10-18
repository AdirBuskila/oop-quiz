#include <iostream>
#include <vector>
using namespace std;
class Complex {
private:
   int real, imag;

public:
   Complex(int r, int i) : real(r), imag(i) {}

   friend Complex operator+(const Complex& c1, const Complex& c2);

   void display() const {
      cout << real << " + " << imag << "i" << endl;
   }
};

Complex operator+(const Complex& c1, const Complex& c2) {
   return Complex(c1.real + c2.real, c1.imag + c2.imag);
}

int main() {
   Complex c1(3, 4), c2(1, 2);
   Complex c3 = c1 + c2;
   c3.display();
   return 0;
}
