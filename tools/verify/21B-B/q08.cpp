#include <iostream>
#include <vector>
using namespace std;
class One { public: int one; One() { one = 1; } };
class Two :public One { public: int two; Two() { this->two = 2; } };
int main() { Two* two = new Two(); std::cout << two->one << two->two; }
