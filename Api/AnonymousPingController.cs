using Angular2AspNetCoreStarter.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Angular2AspNetCoreStarter.Api
{
  [AllowAnonymous]
  [Route("api/ping/anonymous")]
  public class AnonymousPingController : Controller
  {
    // GET: api/ping
    [HttpGet]
    public IActionResult Get()
    {
      return new OkObjectResult(new PingResponse { Data = "PONG" });
    }
  }
}
