class A { A(){} A(const A&){} public: static A* make(){ return new A(); } };
int main(){ A* a = A::make(); A b(*a); }
