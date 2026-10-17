#include <iostream>
#include <vector>
using namespace std;
int main() {
	int temp,n=6;
	vector<int> the_vector;
	vector<int>::iterator the_iterator;
	vector<int>::reverse_iterator rev_iterator;
	for (int i = 0; i < n; i++)
		the_vector.push_back(i);
	the_iterator = the_vector.begin();
	rev_iterator = the_vector.rbegin();
	for(int i=0;i<n/2;i++){
		temp = *the_iterator;
		*the_iterator = *rev_iterator;
		*rev_iterator = temp;
		the_iterator++;
		rev_iterator++;
	}
	the_iterator = the_vector.begin();
	while (the_iterator < the_vector.end()) {
		cout << *the_iterator++;
	}
	return 0;
}
