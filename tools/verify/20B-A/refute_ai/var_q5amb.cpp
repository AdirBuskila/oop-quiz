class Memory {
public:
    Memory(int i = 0) { this->i = j = i; }
    Memory(double j) { this->j = i = j + 1; }
private:
    int i, j;
};
int main(){ Memory a; Memory b(1); Memory c(1.5); }
