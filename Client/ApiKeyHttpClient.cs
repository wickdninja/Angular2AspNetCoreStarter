using System.Net.Http;
using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Angular2AspNetCoreStarter.Client
{
  public class ApiKeyHttpClient : HttpClient, IAuthenticatedHttpClientWithApiKey
  {
    public ApiKeyHttpClient(HttpMessageHandler handler) : base(handler)
    {
    }
  }
}
