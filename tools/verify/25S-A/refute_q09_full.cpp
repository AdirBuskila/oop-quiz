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
    b.protA = 2;   // line 2
    b.privA = 3;   // line 3
    a.pubA = 4;    // line 4
    a.protA = 5;   // line 5
    a.privA = 6;   // line 6
}
