#include <iostream>
using namespace std;
template <typename T>
class MyClass {
	T x;
public:
	MyClass(T val) : x(val) {}
	T getX() { return x; }
	void setX(T val) { x = val; }
};
int main() {
	MyClass<int> obj1(10);
	MyClass<double> obj2(15.5);
	cout << obj1.getX() << " " << obj2.getX() << " ";
	MyClass<char*> obj4("Hello!");
	cout << obj4.getX() << endl;
	return 0;
}
