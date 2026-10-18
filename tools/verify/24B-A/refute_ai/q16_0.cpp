class A
{
        int n;
public:
        A(int _n) : n(_n) {}
        const int& f1(const int& a) const {
                int y = a;
                return n;
        }
};
int main() {
        A a1(10);
        int y = a1.f1(5);
        a1.f1(5) = 7;
}
