namespace Angular2AspNetCoreStarter.Interfaces
{
  public interface IAuthenticate
  {
    string GetAuthorizationHeader(string url, string domain = null, string username = null);

  }
}
