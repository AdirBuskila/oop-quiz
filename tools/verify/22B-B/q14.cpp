#include <iostream>
#include <vector>
using namespace std;
class A { friend class B; friend void pub(A&); public: friend void pub2(A&); private: friend void priv(A&); int s = 1; };
class B { public: int g(A& a) { return a.s; } };
void pub(A& a) { cout << a.s; } void pub2(A& a) { cout << a.s; } void priv(A& a) { cout << a.s; }
int main() { A a; B b; pub(a); pub2(a); priv(a); cout << b.g(a) << endl; }
