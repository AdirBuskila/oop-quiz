class A { protected: int p; public: A() : p(1) {} };
class Other { public: int get(A& a) { return a.p; } };            // not allowed
int main() { return 0; }
