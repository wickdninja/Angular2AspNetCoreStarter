using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Angular2AspNetCoreStarter.Models
{
  public class AuthenticationRequest: HttpContent
  {
    public string Domain { get; set; }
    public string HashedPassword { get; set; }
    public string UserName { get; set; }
    public string PublicAPIKey { get; set; }
    public string OnBehalfOf { get; set; }
    public string OnBehalfOfDomain { get; set; }
    protected override Task SerializeToStreamAsync(Stream stream, TransportContext context)
    {
      throw new System.NotImplementedException();
    }

    protected override bool TryComputeLength(out long length)
    {
      var str = new StringBuilder();
      str.Append(this.Domain);
      str.Append(this.HashedPassword);
      str.Append(this.UserName);
      str.Append(this.PublicAPIKey);
      str.Append(this.OnBehalfOf);
      str.Append(this.OnBehalfOfDomain);
      var result = str.ToString();
      length = Convert.ToInt64(result.Length);
      return true;
    }
  }
}
