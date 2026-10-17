class A { protected: int p; public: A() : p(1) {} };
int main() { A a; return a.p; }                                    // protected is not public (b false)
