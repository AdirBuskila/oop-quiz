class Home { public: Home(const int &i)  { num1 = num2 = i; } private : int num1; double num2; };
class Room : public Home { public: Room() : num1(3) { } };
