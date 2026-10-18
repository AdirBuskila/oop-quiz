class A {};
int main()
{
   A a;
   A b = a;
   A c(b);
   a = b;
   return 0;
}
