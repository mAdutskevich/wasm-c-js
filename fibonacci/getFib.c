int getFib(int n)
{
  if (n == 1)
    return 1;
  if (n == 2)
    return 1;
  return getFib(n - 1) + getFib(n - 2);
}