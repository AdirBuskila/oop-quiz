#include <iostream>
using namespace std;
template <class T>
class A{
public:
    A(int i = 0) { ii = i; }
    A(const A& rhs);
    ~A() { ; }
    A& operator=(const A& rhs) { ii = rhs.ii; return *this; };
    friend ostream& operator<< (ostream&, A<T>&);
private:
    int ii;
};
template <class T>
ostream& operator<< (ostream& output, A<T>& arg){
    output << arg.ii << endl;
    return output;
}
template <class U> A<U>::A(const A& rhs){
    ii = rhs.ii;
}
int main(){
    A<int> aa;
    aa = 5;
    cout <<endl << aa << endl;
    return 0;
}
