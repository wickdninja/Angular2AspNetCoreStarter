using System;
using System.Collections.Generic;

namespace Angular2AspNetCoreStarter.Models
{
  public class User
  {
    public Guid Id { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public List<string> Roles { get; set; }

    public User()
    {
      Roles = new List<string>();
    }

    public bool IsInRole(string role)
    {
      return Roles.Contains(role) || Roles.Contains("ALL");
    }
  }
}
