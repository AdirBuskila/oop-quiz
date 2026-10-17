class C {
public:
	int x;
	C operator+(double d) const { C r; r.x = x + (int)d; return r; }
};
int main() {
	C c1;
	c1.x = 2;
	c1 = 3.2 + c1;
	return 0;
}
