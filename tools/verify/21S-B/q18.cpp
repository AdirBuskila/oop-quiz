#include <iostream>
#include <vector>
using namespace std;
void func(){
    vector<int> v(5, 3);
    for (int i=0;i<v.size();i++)
        cout << v[i];
}
int main(){
    func();
}
