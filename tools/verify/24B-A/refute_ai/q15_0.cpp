#include <iostream>
#include <vector>
using namespace std;
class Box{
public:
        double width;
        double length;
        double height;
        Box(double w, double l, double h)
        {
                width = w; length = l; height = h;
        }
        Box(Box b)
        {
                width = b.width;
                length = b.length;
                height = b.height;
        }
        //... Other member functions follow ...
};
int main() {
        Box b1(1.1, 2.2, 3.3);
        Box b2 = b1;
        cout << b1.height++;
        cout << b1.height--;
        return 0;
}
