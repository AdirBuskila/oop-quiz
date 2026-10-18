class MyClass { virtual int f() = 0; };
class MyClass1 : public MyClass { int f(){return 0;} };
class Myclass2 :public MyClass { };
class MyClass3 :public MyClass { int f(){return 0;} };
const MyClass * f1(const MyClass1&, const Myclass2 ) {return new MyClass3();}
