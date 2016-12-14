using Angular2AspNetCoreStarter.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Angular2AspNetCoreStarter.Api
{
    [AllowAnonymous]
    [Route("api/version")]
    public class VersionController : Controller
    {
        private readonly IOptions<VersionConfig> _config;
        public VersionController(IOptions<VersionConfig> config)
        {
            _config = config;
        }
        // GET: api/version
        [HttpGet]
        public IActionResult Get()
        {
            return new OkObjectResult(_config.Value);
        }
    }
}
