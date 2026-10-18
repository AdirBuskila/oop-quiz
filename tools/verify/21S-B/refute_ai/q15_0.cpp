#include <iostream>
#include <vector>
using namespace std;
class ClassA {
public:
        void display() { cout << "Displaying Class A"; }
};

class ClassB : public ClassA {
public:
        void jump(int num) { cout << "Jumping " << num << endl; }
        void display() { ClassA::display();  cout << "Displaying Class B" << endl; }
};

int main(){
        ClassA *aPtr;
        ClassB b;
        aPtr->jump(3);
}
