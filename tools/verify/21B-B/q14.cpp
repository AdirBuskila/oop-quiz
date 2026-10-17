#include <iostream>
#include <vector>
using namespace std;
int main() { vector<float> vf(5); vector<float>::iterator iter = vf.begin() + 2;
 while (iter != --vf.end()) cout << *iter++; }
