class A
{
public:     void pubA() {};
protected:  void protA() {};
private:    void privA() {};
};

class B : protected A {
public:
    void accessA() {



    }
};


int main()
{
     B b;

     b.protA();// line 5

}
