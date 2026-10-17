#include <iostream>
using namespace std;
struct A { A(){cout<<"A ";} ~A(){cout<<"~A ";} };
struct B { B(){cout<<"B ";} ~B(){cout<<"~B ";} };
struct C : public B, public A { C(){cout<<"C ";} ~C(){cout<<"~C ";} };
struct D { D(){cout<<"D ";} ~D(){cout<<"~D ";} };
struct E : public D { E(){cout<<"E ";} ~E(){cout<<"~E ";} };
struct F : public E { F(){cout<<"F ";} ~F(){cout<<"~F ";} };
struct G : public F, public C { G(){cout<<"G ";} ~G(){cout<<"~G ";} };
int main() { { G g; cout << "| "; } cout << endl; return 0; }
