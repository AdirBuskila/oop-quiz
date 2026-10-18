#include <iostream>
using namespace std;
double m1(int i = 0) { return i + 1; }
int m1(double d = 0) { return d + 2; }
int m2(double d, int i=1) { return i + 2 * d; }
int m2(int i) { return 7; }
int main(){ int i = 1; std::cout << m2(1.0+m1(i)); }
