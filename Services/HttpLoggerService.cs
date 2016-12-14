using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Angular2AspNetCoreStarter.Services
{
  public class HttpLoggerService
  {
    public async void Log(HttpResponseMessage response)
    {
      var content = await response.Content.ReadAsStringAsync();
      Console.WriteLine($"HTTP  {response.RequestMessage.RequestUri}");
      Console.WriteLine($"Request Headers: {response.RequestMessage.Headers}");
      Console.WriteLine($"Status: {response.StatusCode}");
      Console.WriteLine($"Content Length: {content.Length}");
    }
  }
}
