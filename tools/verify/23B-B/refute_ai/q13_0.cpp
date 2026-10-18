#include <iostream>
#include <vector>
using namespace std;
class CD{
public:
    CD(int value) :data(value) { cout << "+" << data; }
    ~CD() { cout << "-"<< data; }
private:
    int data;
};
void create(void);
CD first(1);
int main() {
    cout << "main";
    CD second(2);
    static CD third(3);
    create();
    CD fourth(4);
    return 0;
}
void create(void){
    CD fifth(5);
    static CD sixth(6);
    CD seventh(7);
}
