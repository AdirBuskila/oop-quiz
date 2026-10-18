class X {
public:
    virtual void f() = 0;
};
class Y : public X {
    void f() { }
};
class Z : public Y {};
