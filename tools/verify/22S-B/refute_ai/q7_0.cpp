#include <iostream>
#include <vector>
using namespace std;
template<class T>class Counter
{
    static int counter;
    const int id;
public:
    Counter() :id(++counter) {}
    int getId() { return id; }
    static int getCounter() { return counter; }
};
class B : public Counter<B> {};
class C : public Counter<C> {};
template<class T>
int Counter<T>::counter = 0;
C c;
int main()
{
    B b;
    static C c;
    cout << B::getCounter() << b.getId() ; cout << C::getCounter();
    C* pc = new C();
    cout << B::getCounter() ;
    cout << C::getCounter()  << pc->getId() ;
    return 1;
}
