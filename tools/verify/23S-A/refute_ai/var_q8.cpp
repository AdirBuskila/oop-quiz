class A { public: A operator%(int); };
class B { };
A operator%(A,int);
int main(){}
