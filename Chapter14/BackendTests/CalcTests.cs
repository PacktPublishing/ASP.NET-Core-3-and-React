using Xunit;

namespace BackendTests
{
    public class CalcTests
    {
        [Fact]
        public void Add_When2Integers_ShouldReturnCorrectInteger()
        {
            var result = Calc.Add(1, 1);
            Assert.Equal(2, result);
        }
    }
}