class C { C(){} C(int){} public: static C make(){ return C(); } };
int main(){ C c = C::make(); }
