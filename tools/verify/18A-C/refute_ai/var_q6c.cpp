class X{public: X&f(){return this;}}; int main(){X x; return !(&x==&x.f());}
