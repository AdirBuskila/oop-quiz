class B;
class A
{
    void f(B b) {
        b.pubB = 1;   // line 1


    }
};

class B : public A {
public:     int pubB;
protected:  int protB;
private:    int privB;
};
