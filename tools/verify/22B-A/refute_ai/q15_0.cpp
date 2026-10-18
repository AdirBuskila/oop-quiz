class X { int x; };
class Y : public X { int y;... };
class Z : public X { int z;... };
class W : public Y, public Z { int w;... };
