class X {
public:
    X() : x(*this) {}
    X(int a) { x = this; }
    X(int a, int b) { }
    X &x;
};
