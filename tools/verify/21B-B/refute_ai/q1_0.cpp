class A {
     int* p;
     A(int n=1) { p = new int[n]; }
     ~A() { delete [] p; }
     A f() { return *this; }
     int g() { A a1; A a2; a2=f(); }
     // ...
};
