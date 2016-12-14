using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Interfaces;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Angular2AspNetCoreStarter.Client
{
  public class AuthHeaderHttpClient : HttpClient, IAuthenticatedHttpClientWithHeader
  {
    const string ContentType = "application/json";
    private readonly IHttpContextAccessor _httpContextAccessor;
    public AuthHeaderHttpClient(IHttpContextAccessor httpContextAccessor, HttpMessageHandler handler) : base(handler)
    {
      _httpContextAccessor = httpContextAccessor;
    }

    public IAuthenticate Authenticator { get; set; }

    public Task<HttpResponseMessage> GetAsync(string uri, string username)
    {
      SetAuthorizationHeader(uri, null, username);
      return base.GetAsync(uri);
    }


    public HttpContext Context { get; set; }

    public new Task<HttpResponseMessage> GetAsync(string uri)
    {
      SetAuthorizationHeader(uri);
      return base.GetAsync(uri);
    }

    public Task<HttpResponseMessage> PostAsync<T>(string uri, string username, T value)
    {
      SetAuthorizationHeader(uri, null, username);
      var json = JsonConvert.SerializeObject(value);
      return base.PostAsync(uri, new StringContent(json, Encoding.UTF8, ContentType));
    }

    public Task<HttpResponseMessage> PostAsync<T>(string uri, T value)
    {
      SetAuthorizationHeader(uri);
      var json = JsonConvert.SerializeObject(value);
      return base.PostAsync(uri, new StringContent(json, Encoding.UTF8, ContentType));
    }

    public Task<HttpResponseMessage> PatchAsync<T>(string uri, T value)
    {
      SetAuthorizationHeader(uri);
      DefaultRequestHeaders.Add("X-HTTP-Method-Override", "PATCH");
      var json = JsonConvert.SerializeObject(value);
      return base.PostAsync(uri, new StringContent(json, Encoding.UTF8, ContentType));
    }

    public Task<HttpResponseMessage> PutAsync<T>(string uri, T value)
    {
      SetAuthorizationHeader(uri);
      DefaultRequestHeaders.Add("X-HTTP-Method-Override", "PUT");
      var json = JsonConvert.SerializeObject(value);
      return base.PostAsync(uri, new StringContent(json, Encoding.UTF8, ContentType));
    }

    public new Task<HttpResponseMessage> DeleteAsync(string uri)
    {
      SetAuthorizationHeader(uri);
      return base.DeleteAsync(uri);
    }

    private void SetAuthorizationHeader(string uri, string domain = null, string username = null)
    {
      var url = string.Format("{0}{1}", BaseAddress, uri);
      if (username == null) username = Context?.User.Identity.Name;
      var header = Authenticator.GetAuthorizationHeader(url, domain, username);
      this.DefaultRequestHeaders.Remove("Authorization");
      this.DefaultRequestHeaders.Add("Authorization", header);
    }
  }
}
