class C {
public:
	int x;
};
int main() {
	C c1;
	c1.x = 2;
	c1 = 3.2 + c1;
}
