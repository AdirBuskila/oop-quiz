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


    }
};


int main()
{
     B b;



}
