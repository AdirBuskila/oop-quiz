class A { public: A(){} private: A(const A&){} };
int main(){ A a; A b(a); }
