class M {
public:
    M(int n = 0) { i = n; }
    const M& f() const
    {
        return *this;
    }
    void g() {}
    int i;
};
int main(){
    const M m(2);
    m.f();
    m.g();
    return 0;
}
