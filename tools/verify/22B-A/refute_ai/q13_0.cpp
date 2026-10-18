#include <iostream>
#include <vector>
using namespace std;
# include <vector>

int main() {
     int a[6] = { 10, 20, 30, 40, 50, 60 };
     vector<int> v(a+1, a + 5);
     a[2] = 20;
     vector<int>::iterator it;
     it = v.begin();
     it++;
     it++;
     int total = 0;
     while (it != v.end()) {
          total += *it;
          it++;
     }
     cout << total << endl;
}
