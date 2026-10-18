#include <iostream>
using namespace std;
int main() {
    int arr[] = { 1, 2, 3 };
    int(&arrRef)[3] = arr;
    int &r0 = arrRef[0];
    r0 = arrRef[1] = arr[2] = 5;
    cout << arr[0] << arr[1] << arr[2];
}
