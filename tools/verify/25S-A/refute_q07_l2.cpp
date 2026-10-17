class A
{
public:     void pubA() {};
protected:  void protA() {};
private:    void privA() {};
};

class B : protected A {
public:
    void accessA() {

        protA();  // line 2

    }
};


int main()
{
     B b;



}
