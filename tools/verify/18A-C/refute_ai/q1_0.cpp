___ f() {
    static int x = 0;
    return x;
}
int main() { f() = 5; }
