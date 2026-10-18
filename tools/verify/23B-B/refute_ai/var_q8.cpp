char c;
class X {
    char c;
public:
    class Y {
    public:
        void f(char r) {
            X t;
            ::c = t.X::c = c = r;
        }
    private:
        char c;
    };
};
