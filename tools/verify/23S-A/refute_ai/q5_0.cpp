#include <iostream>
#include <vector>
using namespace std;
#include <vector>
int main(){
    vector <int> v1;
    v1.push_back(8);
    v1.push_back(9);
    vector <int> v2;
    v2.push_back(-8);
    v2.push_back(5);
    v2.push_back(51);
    vector<vector<int> > A;
    A.push_back(v1);
    A.push_back(v2);
    A.push_back(v1);
    A[1][1] = 35;
    for (int i = 0; i < A.size(); i++)
    {
        for (int j = 0; j < A[i].size(); j++)
            cout << A[i][j] << " ";
        cout << endl;
    }
    cout << v2[1];
    return 0;
}
