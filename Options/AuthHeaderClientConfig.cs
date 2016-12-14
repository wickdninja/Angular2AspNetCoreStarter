using Angular2AspNetCoreStarter.Models;

namespace Angular2AspNetCoreStarter.Options
{
  public class AuthHeaderClientConfig: ClientConfig
  {
    public string PublicKey { get; set; }
    public string PrivateKey { get; set; }
  }
}
