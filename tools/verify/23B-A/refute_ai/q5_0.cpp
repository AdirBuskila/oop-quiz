class student { int marks; };

class topper : public student {
    int age;
    topper(int age) {
        this->age = age;
    }
};
