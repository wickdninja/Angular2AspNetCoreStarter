using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Client;
using Angular2AspNetCoreStarter.Models;
using Angular2AspNetCoreStarter.Interfaces;
using Angular2AspNetCoreStarter.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Angular2AspNetCoreStarter.Services
{
  public class AuthenticatedService
  {
    protected readonly IOptions<ClientConfig> Config;
    protected readonly IAuthenticatedHttpClient Client;
    public AuthenticatedService(IOptions<ClientConfig> config, IAuthenticatedHttpClient client, IAuthenticate authenticator)
    {
      Config = config;
      Client = client;
      Client.Authenticator = authenticator;
    }

  }
}
