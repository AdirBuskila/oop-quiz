#include <iostream>
using namespace std;
int f(int x) { return x; }
double f(int x) { return x * 1.5; }   // differs only in return type
int main() { cout << f(1) << endl; }
