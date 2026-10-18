#include <iostream>
using namespace std;
class Matrix {
private:
   int data[2][2];
public:
   Matrix() { data[0][0] = 1; data[0][1] = 2; data[1][0] = 3; data[1][1] = 4; }
   int getValue(int row, int col) const { return data[row][col]; }
   int& getValue(int row, int col) { return data[row][col]; }
};
int main() {
   const Matrix m1;
   m1.getValue(0,0) = 5;   // Line X uncommented
   return 0;
}
