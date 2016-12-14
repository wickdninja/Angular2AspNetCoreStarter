using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using Angular2AspNetCoreStarter.Client;
using Angular2AspNetCoreStarter.Interfaces;
using Angular2AspNetCoreStarter.Models;
using Angular2AspNetCoreStarter.Options;
using Microsoft.AspNetCore.Http;

namespace Angular2AspNetCoreStarter.Services
{
  public class LoginService : ILoginServiceService
  {
    private readonly IOptions<AuthHeaderClientConfig> _clientConfig;
    private readonly IOptions<AuthenticationConfig> _authConfig;
    private readonly HttpLoggerService _logger;
    private readonly IAuthenticatedHttpClient _client;
    public LoginService(
      IOptions<AuthHeaderClientConfig> clientConfig,
      IOptions<AuthenticationConfig> authConfig,
      IAuthenticatedHttpClient client,
      IAuthenticate authenticator,
      HttpLoggerService logger)
    {
      _clientConfig = clientConfig;
      _authConfig = authConfig;
      _client = client;
      _client.Authenticator = authenticator;
      _logger = logger;
    }

    private async Task<AuthChallengeResponse> GetAuthChallenge(string username)
    {
      return await new Task<AuthChallengeResponse>(() => new AuthChallengeResponse
      {
        Challenge = "MockChallenge",
        PinSalt = "MockPinSalt",
        Salt = "MockSalt"
      });
    }

    public async Task<User> Login(string username, string password)
    {
      var challengeResponse = await GetAuthChallenge(username);
      if (challengeResponse == null || !challengeResponse.IsValid())
      {
        return null;
      }
      var sha = SHA256.Create();
      var hashedPassword = Encoding.UTF8.GetBytes(BCrypt.HashPassword(password, challengeResponse.Salt));
      var input = sha.ComputeHash(hashedPassword);
      var challenge = Convert.FromBase64String(challengeResponse.Challenge);
      var mac = new HMACSHA1(challenge);
      var result = Convert.ToBase64String(mac.ComputeHash(input));
      var auth = new AuthenticationRequest
      {
        Domain = _clientConfig.Value.Domain,
        HashedPassword = result,
        UserName = username,
        PublicAPIKey = _clientConfig.Value.PublicKey,
      };
      // todo REAL login
      return new User
      {
        Id = Guid.Empty,
        Password = hashedPassword.ToString(),
        Roles = new List<string> { "USER" },
        UserName = username
      };
    }
  }
}
