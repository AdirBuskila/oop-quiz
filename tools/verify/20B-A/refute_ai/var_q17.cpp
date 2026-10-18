class Memory {
public:
    Memory(int i = 0) { this->i = j = i; }
    Memory(double j) { this->j = i = j + 1; }
    Memory(const Memory& m) { j = i = m.i; }
private:
    int i, j;
};
class RAM : public Memory { public: RAM() : Memory(3) { } };
int main(){ RAM r; }
