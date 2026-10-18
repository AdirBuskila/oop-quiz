#include <iostream>
#include <vector>
using namespace std;
#include <vector>
int main()
{
    vector <int> v1;
    v1.push_back(8);
    v1.push_back(9);
    vector <int> v2;
    v2.push_back(-8);
    v2.push_back(5);
    v2.push_back(51);
    v2.push_back(3);
    vector<vector<int> > A;
    A.push_back(v1);
    A.push_back(v2);
    A.push_back(v1);
    v2.push_back(10);
    vector<int>::iterator i;
    for (i = A[1].begin(); i != A[1].end(); i+=2)
        cout << *i << " ";
    return 0;
}
