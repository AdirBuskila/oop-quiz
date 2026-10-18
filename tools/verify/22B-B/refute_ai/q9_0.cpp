#include <iostream>
#include <vector>
using namespace std;
#include <vector>

int main()
{
    vector<int> v{ 1, 2, 3, 4, 5 };
    vector<int>::iterator it;

    it = v.begin();
    it++;
    v.erase(it);

    for (vector<int>::iterator it = v.begin(); it != v.end(); ++it)
        cout << ' ' << *it;
    return 0;
}
