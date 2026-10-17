class A
{
public:     int pubA;
protected:  int protA;
private:    int privA;
};

class B : public A {
    friend void funB(B& b, A& a);
};

void funB(B& b, A& a)
{

    b.protA = 2;   // line 2




}
