using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Angular2AspNetCoreStarter.Interfaces
{
  public interface IAuthenticatedHttpClient
  {
    IAuthenticate Authenticator { get; set; }
    HttpContext Context { get; set; }
    Task<HttpResponseMessage> GetAsync(string requestUri);
    Task<HttpResponseMessage> GetAsync(string requestUri, string username);

    Task<HttpResponseMessage> PostAsync<T>(string requestUri, string username, T value);
    Task<HttpResponseMessage> PostAsync<T>(string requestUri, T value);

    Task<HttpResponseMessage> PatchAsync<T>(string requestUri, T value);

    Task<HttpResponseMessage> PutAsync<T>(string requestUri, T value);

    Task<HttpResponseMessage> DeleteAsync(string requestUri);
  }

  public interface IAuthenticatedHttpClientWithHeader : IAuthenticatedHttpClient
  {

  }

  public interface IAuthenticatedHttpClientWithApiKey
  {

  }
}
