using System;
using System.Text;
using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http.Authentication;
using System.Security.Claims;
using Angular2AspNetCoreStarter.Interfaces;
using Angular2AspNetCoreStarter.Models;
using Angular2AspNetCoreStarter.Options;
using Microsoft.AspNetCore.Authorization;

namespace Angular2AspNetCoreStarter.Api
{
  [AllowAnonymous]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly ILoginServiceService _service;
    private readonly IOptions<AuthenticationConfig> _config;
    public AuthController(ILoginServiceService authService, IOptions<AuthenticationConfig> config)
    {
      _service = authService;
      _config = config;
    }

    // POST api/values
    [HttpPost("login", Name = "Login")]
    public async Task<IActionResult> Login([FromBody]AuthRequest request)
    {
      if (string.IsNullOrEmpty(request.Username)) return new BadRequestObjectResult("Username is required!");
      if (string.IsNullOrEmpty(request.Password)) return new BadRequestObjectResult("Password is required!");
      var password = Encoding.UTF8.GetString(Convert.FromBase64String(request.Password));
      var user = await _service.Login(request.Username, password);
      if (user == null) return Unauthorized();
      var identity = new UserIdentity(_config, user);
      var principal = new ClaimsPrincipal(identity);
      await HttpContext.Authentication.SignInAsync(_config.Value.Scheme, principal);
      return new OkObjectResult(user);
    }

    // POST api/values
    [HttpGet("logout", Name = "LogOut")]
    public async Task<IActionResult> LogOut()
    {
      await HttpContext.Authentication.SignOutAsync(_config.Value.Scheme);
      return new OkResult();
    }
  }
}
