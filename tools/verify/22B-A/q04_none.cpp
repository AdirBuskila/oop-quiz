#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
static set<void*> live; static int dbl = 0;
void* operator new[](size_t n) { void* p = malloc(n); live.insert(p); return p; }
void operator delete[](void* p) noexcept { if (!live.erase(p)) { dbl++; return; } free(p); }
class A { public: int* d; A() { d = new int[2]; } ~A() { delete[] d; } };
int main() { A *p1 = new A, *p2 = new A; *p1=*p2=*p2; delete p1; delete p2; cout << "double=" << dbl << " live=" << live.size() << endl; }
