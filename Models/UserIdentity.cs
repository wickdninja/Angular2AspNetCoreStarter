using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Angular2AspNetCoreStarter.Extensions;
using Angular2AspNetCoreStarter.Options;
using Microsoft.Extensions.Options;

namespace Angular2AspNetCoreStarter.Models
{
  public class UserIdentity : IIdentity
  {

    private readonly IOptions<AuthenticationConfig> _config;

    public UserIdentity(IOptions<AuthenticationConfig> config, User user)
    {
      Claims = new List<Claim>();
      _config = config;
      this.Roles = user.Roles;
      this.Name = user.UserName;
      Claims.Append(new Claim(ClaimTypes.Name, user.UserName));
      foreach (var role in user.Roles)
      {
        Claims.Append(new Claim(ClaimTypes.Role, role));
      }
    }
    public IList<string> Roles { get; private set; }
    public string Name { get; private set; }
    public IEnumerable<Claim> Claims { get; }

    public Claim FindFirst(string type)
    {
      return Claims.FirstOrDefault(c => c.Type == type);
    }
    public Claim HasClaim(string type, string value)
    {
      return Claims.FirstOrDefault(c => c.Type == type && c.Value == value);
    }
    public bool IsInRole(string role)
    {
      return Roles.Any(x => x.SafeEquals(role)) || Roles.Any(x => x.SafeEquals("ALL"));
    }
    public string AuthenticationType
    {
      get
      {
        return _config.Value.Scheme;
      }
    }

    public bool IsAuthenticated
    {
      get
      {
        return true;
      }
    }
  }
}
