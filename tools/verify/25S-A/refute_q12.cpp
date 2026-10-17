#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v;

    v.push_back(10);
    int p = &v[0];
    int it = v.begin();

    v.push_back(20);

    v.insert(v.begin(), 5);

    cout << p << " " << it << " " << v[0] << "\n";
}
