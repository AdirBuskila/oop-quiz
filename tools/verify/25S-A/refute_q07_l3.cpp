class A
{
public:     void pubA() {};
protected:  void protA() {};
private:    void privA() {};
};

class B : protected A {
public:
    void accessA() {


        privA();  // line 3
    }
};


int main()
{
     B b;



}
