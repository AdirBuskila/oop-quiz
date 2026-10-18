#include <iostream>
#include <vector>
using namespace std;
class A {
public:
        int num;
        A(int i = 0) {
                num = i;
        }
};

A& operator++(A& a) {
        a.num++;
        return a;
}

A operator++(A& a, int) {
        A temp = a;
        a.num += 2;
        return temp;
}

A operator+(const A& a1, const A& a2) {
        A temp;
        temp.num = a1.num + a2.num;
        return temp;
}

int main()
{
        A a1(1), a2(2), a3, a4;
        a3 = a1++ + ++a2;
        a4 = operator++(a1, 0) + operator++(a2);
        cout << a3.num << a4.num;
        return 0;
}
