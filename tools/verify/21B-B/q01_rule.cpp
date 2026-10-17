#include <iostream>
#include <vector>
using namespace std;
// Instrumented variants of class A from Q1: detect double delete[] using a registry of live arrays.
#include <set>
#include <cstdlib>
static set<void*> live; static int dbl = 0;
void* operator new[](size_t n) { void* p = malloc(n); live.insert(p); return p; }
void operator delete[](void* p) noexcept { if (!live.erase(p)) { dbl++; return; } free(p); }
#ifndef VARIANT
#define VARIANT 'c'
#endif
class A {
public:
  int* p;
  A(int n=1) { p = new int[n]; }
  ~A() { delete [] p; }
#if VARIANT=='a'
  A& operator=(const A& o) { p = new int[1]; return *this; }
#elif VARIANT=='c'
  A(const A& o) { p = new int[1]; }
  A& operator=(const A& o) { return *this; }
#elif VARIANT=='b'
  A& operator=(const A& o) { return *this; }
  bool operator==(const A& o) { return true; }
#endif
  A f() { return *this; }
  int g() { A a1; A a2; a2=f(); return 0; }
};
int main() { { A x; x.g(); } cout << "double deletes=" << dbl << " leaks=" << live.size() << endl; }
