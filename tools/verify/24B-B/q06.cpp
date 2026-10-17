// Q6: operator+ as member, as friend, and as plain non-friend function all compile
class A { int v; public:
  A(int x=0):v(x){}
  int get() const { return v; }
  A operator+(const A& o) const { return A(v+o.get()); }
};
class Bf { int v; public:
  Bf(int x=0):v(x){}
  friend Bf operator+(const Bf& a, const Bf& b) { return Bf(a.v+b.v); }
};
class Cn { int v; public:
  Cn(int x=0):v(x){}
  int get() const { return v; }
};
Cn operator+(const Cn& a, const Cn& b) { return Cn(a.get()+b.get()); }
int main() { A a; Bf b; Cn c; a = a + a; b = b + b; c = c + c; return 0; }
