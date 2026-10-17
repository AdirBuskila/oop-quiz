class A
{
public:     void pubA() {};
protected:  void protA() {};
private:    void privA() {};
};

class B : protected A {
public:
    void accessA() {
        pubA();   // line 1
        protA();  // line 2
        privA();  // line 3
    }
};


int main()
{
     B b;
     b.pubA(); // line 4
     b.protA();// line 5
     b.privA();// line 6
}
