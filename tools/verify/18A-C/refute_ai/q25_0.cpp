class X {
public:
    int x;
    const int y;
    X() : x(1), y(1) {}
    void g() {
        x = 1;
        y = 1;
    }
};
