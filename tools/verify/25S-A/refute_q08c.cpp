class B;
class A { void f(B b); };
class B : public A {
public: int pubB; protected: int protB; private: int privB;
};
void A::f(B b) {
 b.pubB = 1; // 1
 b.protB = 2; // 2
 b.privB = 3; // 3
}
