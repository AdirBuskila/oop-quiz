class B {
public:
	int x;
	B(int x=0) { this->x = x; }
};
class A : public B {
public:
	int y;
	A(int y) { this->y = y; }
};

int main() {
	A a1(4);
	A a2(5);
	B b1;
	A* p1=&b1;
	B* q1=&a1;
	A* p2 = &a1;
	B* q2 = &a2;
	p2 = q2;
	q2 = p2;
	p2 = (A*)q2;
	p2->y = 9;
}
