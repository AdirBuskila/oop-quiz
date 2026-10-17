#include <iostream>
#include <vector>
using namespace std;
class House { public: int rooms; const int size; House(int r, int s = 0) :rooms(r), size(s) { }
 void   setRoom(int r) { rooms = r; }
 int getSize() { return size; } };
int main() { House h(4, 120); std::cout << h.setRoom(5).getSize(); }
