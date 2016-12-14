using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Angular2AspNetCoreStarter.Client
{
    public class Proxy: IWebProxy
    {
      private readonly Uri _uri;
      public Proxy(string baseUrl, int port)
      {
        _uri = new Uri($"{baseUrl}:{port}");
      }

      public Uri GetProxy(Uri destination)
      {
        return _uri;
      }

      public bool IsBypassed(Uri host)
      {
        return false;//proxy all requests
      }

      public ICredentials Credentials { get; set; }
    }
}
