#include <iostream>
#include <vector>
using namespace std;
class T{
private:
    int a;
public:
    static int n;
    int b;
    T(int i, int j) { a = i; b = j; }
    T(const T &r){
        a = r.a; b = r.b;
        n++;
    }
};
int T::n = 0;
T ret_obj(const T& t){
    return t;
}
void pass_obj(T t){
    ;
}
int main(){
    T t1(1, 2), t2(3, 4);
    ret_obj(t1);
    pass_obj(t1);
    cout << T::n;
    return 0;
}
