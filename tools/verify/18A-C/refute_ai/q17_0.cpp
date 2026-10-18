template<typename T> class X {};
int main() {
    X x;
    X x(int);
    X x<int>;
    X<int> x;
}
