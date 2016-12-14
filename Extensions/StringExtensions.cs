using System;

namespace Angular2AspNetCoreStarter.Extensions
{
    public static class StringExtensions
    {

        public static string SmartTrim(this string str)
        {
            return string.IsNullOrEmpty(str) ? str : str.Trim();
        }

        public static bool SafeEquals(this string x, string y)
        {
            if (x == null && y == null) return true;
            if (x == null || y == null) return false;
            return x.SmartTrim().Equals(y.SmartTrim(), StringComparison.CurrentCultureIgnoreCase);
        }
    }
}
