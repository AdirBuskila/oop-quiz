template<class T>
void f(T t){}

template<class T>
void f(T* t) {};

int main()
{
    int* p, i=3;
    double d = 3.1415;
    p = &i;
    f(i);
    f(d);
    f(p);
}
