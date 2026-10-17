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
    b.pubA = 1;    // line 1





}
