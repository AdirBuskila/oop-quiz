#include <iostream>
using namespace std;
template <typename T> void h(T) { cout << "by value\n"; }
template <typename T> void h(T*) { cout << "ptr to T\n"; }
template <typename T> void h(const T*) { cout << "ptr to const T\n"; }
template <> void h<const char*>(const char*) { cout << "C-string\n"; }
int main(){ const char* s="abc"; h<const char*>(s); h<char>(s); h(s);}
