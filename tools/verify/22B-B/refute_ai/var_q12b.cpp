class A { public: A(){} private: A& operator=(const A&){return *this;} };
int main(){ A a; A b(a); A c; c=a; }
