// same as q14 but with -Werror=writable-strings semantics written out: string literal to char*
template <typename T> class MyClass { T x; public: MyClass(T val) : x(val) {} T getX() { return x; } };
int main() { MyClass<char*> obj4("Hello!"); return 0; }
