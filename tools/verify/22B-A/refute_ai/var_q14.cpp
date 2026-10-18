class A { A(){} public: static A make(){ return A(); } };
int main(){ A a = A::make(); A b(a); }
