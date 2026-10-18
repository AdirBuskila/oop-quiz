#include <iostream>
#include <vector>
using namespace std;
int& smallest(int& r, int& s){
    if (r < s) return r;
    else       return s;
}
int main(){
    int k = 6;
    int m = 5;
    smallest(k, m) = 10;
    smallest(k, m)--;
    cout << "k=" << k << ", m=" << m << endl;
}
