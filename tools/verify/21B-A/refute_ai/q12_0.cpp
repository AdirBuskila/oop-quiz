int main()
{
    int i = 12;
    const int ci = 12;
    ci = 13;
    const int* ip3 = &i;
    i = 10;
    *ip3 = 10;
}
