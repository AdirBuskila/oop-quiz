#include <iostream>
#include <vector>
#include <cstdlib>
#include <set>
using namespace std;
struct Person { Person() {} Person(const Person&) { cout << "[copy]"; } };
Person gp;
void f1(Person &p) {} void f2(Person p) {} void f3(Person *p) {}
Person f4() { Person t; return t; }
Person &f5() { return gp; } Person *f6() { return &gp; }
int main() { Person a; cout << "f1:"; f1(a); cout << "\nf2:"; f2(a); cout << "\nf3:"; f3(&a); cout << "\nf4:"; f4(); cout << "\nf5:"; f5(); cout << "\nf6:"; f6(); cout << endl; }
