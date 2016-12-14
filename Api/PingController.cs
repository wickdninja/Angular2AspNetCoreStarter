using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Angular2AspNetCoreStarter.Api
{
  [Authorize]
  [Route("api/[controller]")]
  public class PingController : Controller
  {
    // GET: api/ping
    [HttpGet]
    public IActionResult Get()
    {
      return new OkObjectResult("PONG");
    }
  }
}
