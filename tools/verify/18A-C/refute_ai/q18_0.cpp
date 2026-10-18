#include <vector>
#include <iostream>
int main() {
    std::vector<int> v;
    v.push_back(0);
    v.push_back(1);
    v.push_back(2);
    v.insert(v.end(), 9);
    for (int i = 0; i < v.size(); ++i) std::cout << v[i];
}
