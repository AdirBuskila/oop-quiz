 class Home {
 public:
     Home(const int &i)  { num1 = num2 = i; }
     Home(const int *i)  { num1 = num2 = *i; }
     Home(const Home &h) { num1 = num2 = h.num1; }
     Home(Home &h)       { num1 = num2 = h.num1; }
 private :
     int num1;
     double num2;
};
