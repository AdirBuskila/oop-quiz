#include <iostream>
#include <vector>
using namespace std;
struct vector{
    double x;
    double y;
};
vector operator * (double a, vector b)
{
    vector r;
    r.x = a * b.x;
    r.y = a * b.y;
    return r;
}
int main(){
    vector k, m;
    k.x = 2;
    k.y = -1;
    m = 3.1415927 * k;
    cout << "(" << m.x << ", " << m.y << ")" << endl;
}
