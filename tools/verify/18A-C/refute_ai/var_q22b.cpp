class X{}; class Y{public: int operator+(X){return 0;}}; int main(){X x;Y y;x+y;}
