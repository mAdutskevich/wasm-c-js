#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int increment(int a)
{
    return a + 1;
}