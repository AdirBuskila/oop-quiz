#include <iostream>
#include <vector>
using namespace std;
#include <vector>

int main() {
   vector<double> values;
   vector<double>::reverse_iterator rit;
   values.push_back(1.1);
   values.push_back(2.2);
   values.push_back(3.3);
   values.insert(values.begin(), 0.0);
   values.erase(values.begin() + 1);
   if (!values.empty())
      values[values.size() - 1] = 9.9;

   for (rit = values.rbegin(); rit != values.rend(); ++rit)
      cout << *rit << " ";
   cout << endl;

   return 0;
}
