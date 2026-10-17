class B;
class A
{
    void f(B b) {

        b.protB = 2;  // line 2

    }
};

class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};
