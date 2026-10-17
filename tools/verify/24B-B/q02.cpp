class YARD
{
private:
	float length;
public:
	yard(float l)
	{
		length = l;
	}
	float operator float()
	{
		return length;
	}
	//... Other member functions follow ...
};
int main() { return 0; }
