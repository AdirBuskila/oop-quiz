class A { public: A(){} private: A(const A&){} A& operator=(const A&){return *this;} };
int main(){ A a; A c; c=a; }
