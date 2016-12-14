using System;
using System.Security.Cryptography;
using System.Text;
using Angular2AspNetCoreStarter.Interfaces;
using Angular2AspNetCoreStarter.Options;
using Microsoft.Extensions.Options;

namespace Angular2AspNetCoreStarter.Client
{
  public class Authenticator : IAuthenticate
  {
    private readonly IOptions<AuthHeaderClientConfig> _config;

    public Authenticator(IOptions<AuthHeaderClientConfig> config)
    {
      _config = config;
    }

    private string CreateSignature(string url, string timestamp)
    {
      var message = new StringBuilder();
      message.Append(url + "\r\n");
      if (!string.IsNullOrEmpty(timestamp)) message.Append(timestamp + "\r\n");
      var bytes = Encoding.UTF8.GetBytes(message.ToString());
      var key = Encoding.UTF8.GetBytes(_config.Value.PrivateKey);
      var hmac = new HMACSHA1(key);
      var hash = hmac.ComputeHash(bytes);
      return Convert.ToBase64String(hash);
    }

    public string GetAuthorizationHeader(string url, string domain = null, string username = null)
    {
      var timestamp = DateTime.UtcNow.ToString("o");
      var signature = CreateSignature(url, timestamp);
      domain = (domain != null) ? domain : _config.Value.Domain;
      var publicKey = _config.Value.PublicKey;

      var header = new StringBuilder("SCHEME-NAME ");
      if (!string.IsNullOrEmpty(username)) header.Append(string.Format("username={0};", username));
      if (!string.IsNullOrEmpty(domain)) header.Append(string.Format("domain={0};", domain));
      header.Append(string.Format("timestamp={0};signature={1};publickey={2}", timestamp, signature, publicKey));
      return header.ToString();
    }
  }
}
