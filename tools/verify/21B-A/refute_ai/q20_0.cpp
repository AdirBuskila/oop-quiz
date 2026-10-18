#include <string.h>

class Base {
    int* br;
public:
    Base() { br = NULL; }
    ~Base() {
        if(br!=NULL)
            delete br; }
};

class Derived : public Base {
    int* dr;
public:
    Derived() { dr = NULL; }
    ~Derived() {
        if(dr!=NULL)
            delete[] dr; }
    void f() { dr = new int[10]; }
};

int main(){
    Base *bp = new Base;
    delete bp;
    bp = new Derived;
    delete bp;
}
