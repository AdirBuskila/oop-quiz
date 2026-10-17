#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v;

    v.push_back(10);
    int p = &v[0];      // line 1
    int it = v.begin(); // line 2

    v.push_back(20);

    v.insert(v.begin(), 5);

    cout << p << " " << it << " " << v[0] << "\n";
}
