class B;
class A
{
    void f(B b) {


        b.privB = 3;  // line 3
    }
};

class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};
