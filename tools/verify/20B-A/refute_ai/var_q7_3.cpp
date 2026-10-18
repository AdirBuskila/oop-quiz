#include <iostream>
using namespace std;
int f1(int& i, int j = 1) { return i + j; }
int f1(double& i, int j = 1) { return i * j; }
int main() { double k = 2; int l = 1; cout << f1(k&); }
