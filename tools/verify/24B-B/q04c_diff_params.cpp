// statement (c)/(d): different parameter types allow a different return type
int f(int) { return 1; }
double f(double) { return 2.0; }
int main() { f(1); f(1.0); return 0; }
