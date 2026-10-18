#include <iostream>
#include <vector>
using namespace std;
class Matrix {
private:
   int data[2][2];

public:
   Matrix() { data[0][0] = 1; data[0][1] = 2; data[1][0] = 3; data[1][1] = 4; }

   int getValue(int row, int col) const {
      return data[row][col];
   }

   int& getValue(int row, int col) {
      return data[row][col];
   }

   void print() const {
      cout << data[0][0] << " " << data[0][1] << endl;
      cout << data[1][0] << " " << data[1][1] << endl;
   }
};

int main() {
   const Matrix m1;
   Matrix m2;
   int a = m1.getValue(1, 1);
   m2.getValue(0, 0) = 99;
   m2.print();
   // m1.getValue(0,0) = 5;   // Line X
   return 0;
}
