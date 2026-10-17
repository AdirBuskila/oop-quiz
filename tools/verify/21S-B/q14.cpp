#include <iostream>
#include <vector>
using namespace std;
class Base {
public:
    Base(){
        cout << "Base Ctor Called" << endl;
    }
    ~Base(){
        cout << "Base Dtor Called" << endl;
    }
};
class Derived : Base {
public:
    Derived(){
        cout << "Derived Ctor Called" << endl;
    }
    ~Derived(){
        cout << "Derived Dtor Called" << endl;
    }
};
int main(){
    Base *B;
    B=new Derived;
    delete B;
    return 0;
}
