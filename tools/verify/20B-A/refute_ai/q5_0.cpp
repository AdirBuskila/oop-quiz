class Memory {
public:
    Memory(int i = 0) { this->i = j = i; }
    Memory(double j) { this->j = i = j + 1; }
    Memory(const Memory& m) { j = i = m.i = m.j; }
private:
    int i, j;
};
