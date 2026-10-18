#include <iostream>
using namespace std;
#include <string.h>

class MySting {
public:
    MySting(const char* s) {
        s_ = new char[strlen(s) + 1];
        strcpy(s_,s);
    }
    friend MySting operator+(const MySting&, const MySting&);
    operator const char* () const { return s_; }
private:
    char* s_;
};

MySting operator+(const MySting &s1, const MySting &s2)
{
    MySting sum("a");
    sum.s_=strcat(s1.s_, s2.s_);
    return sum;
}

int main()
{
    MySting s1("a"), s2("b");
    MySting temp = s1 + s2;
    const char* p = temp;
    cout<<p;
    cout << temp;
}
