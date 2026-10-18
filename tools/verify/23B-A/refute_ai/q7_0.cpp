#include <iostream>
#include <vector>
using namespace std;
const int DefaultSize = 10;
template <class T>
class Array{
public:
    Array(int itsSize = DefaultSize);
    ~Array() { delete[] pType; }
    T& operator[](int offSet) { return pType[offSet]; }
    const T& operator[](int offSet) const {
        return pType[offSet];
    }
    int GetSize() const { return itsSize; }
    template <class NET>
      friend void infiltrate(const Array<NET> &);
private:
    T* pType;
    int  itsSize;
};
template <class WWW>
void infiltrate(const Array<WWW> &theArray) {
    for (int i = 0; i < theArray.itsSize; i++)
        cout <<  theArray.pType[i] << "; ";
    cout << "\n"; }
template <class T>
Array<T>::Array(int size):itsSize(size){
    pType = new T[size];
    for (int i = 0; i < size; i++)
        pType[i] = 0;
}
int main(){
    Array<int> theArray(3);
    Array<double> theArrayD(2);
    for (int i = 0; i < theArray.GetSize(); i++){
        theArray[i] = i * 2;
    }
    for (int i = 0; i < theArrayD.GetSize(); i++) {
        theArrayD[i] = i / 2.0;
    }
    infiltrate(theArray);
    infiltrate(theArrayD);  return 0;
}
