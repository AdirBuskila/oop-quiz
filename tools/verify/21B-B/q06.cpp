#include <iostream>
#include <vector>
using namespace std;
int& f1(int& x, int& y) { static int t = x > y ? x : y; return t; }
int main() { std::cout << (f1(2, 3) + 4); }
