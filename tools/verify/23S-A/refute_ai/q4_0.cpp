#include <iostream>
#include <vector>
using namespace std;
template <class T> class B{
public:
    B(int nn = 0):n(nn){}
    friend ostream& operator<<(ostream&, const B<T>&);
private:
    int  n;
};
template <class T> ostream& operator<<(ostream& output, const B<T>& theB){
    output << theB.n << endl;
    return output;
}
int main(){
    B<int> intB=5;
    cout << "intB = " << intB;
    return 0;
}
