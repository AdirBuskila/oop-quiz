#include <iostream>
#include <vector>
using namespace std;
class My {
public:
    ~My() {
        std::cout << "Hello from ~My()" << std::endl;
    }
};
class Derived : public My {
public:
    ~Derived() {
        std::cout << "Hello from ~Derived()" << std::endl;
    }
};
int main() {
    My* obj = new Derived();
    delete obj;
    return 0;
}
