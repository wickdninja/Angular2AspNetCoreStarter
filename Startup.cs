using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Client;
using Angular2AspNetCoreStarter.Interfaces;
using Angular2AspNetCoreStarter.Options;
using Angular2AspNetCoreStarter.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Angular2AspNetCoreStarter
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddMvc();
      services.AddSwaggerGen();

      // Add configuration options
      services.Configure<VersionConfig>(Configuration.GetSection("VersionInfo"));
      services.Configure<AuthenticationConfig>(Configuration.GetSection("Authentication"));
      services.Configure<AuthHeaderClientConfig>(Configuration.GetSection("AuthHeaderClient"));
      services.Configure<ApiKeyHttpClient>(Configuration.GetSection("ApiKeyClient"));

      // Add Transient Services
      services.AddTransient<IAuthenticate, Authenticator>();
      services.AddTransient<ILoginServiceService, LoginService>();
      services.AddTransient<HttpLoggerService>();

      // Add Singleton services
      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      // todo refactor provide methods to factory classes
      services.AddSingleton<IAuthenticatedHttpClientWithHeader>(sp => ProvideAuthHeaderHttpClient());
      services.AddSingleton<IAuthenticatedHttpClientWithApiKey>(sp => ProvideApiKeyHttpClient());

      // Set status code to 401 on redirect to login
      services.Configure<IdentityOptions>(o =>
      {
        o.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
        {
          OnRedirectToLogin = ctx =>
          {
            if (ctx.Response.StatusCode == (int)HttpStatusCode.Unauthorized)
            {
              return Task.FromResult<object>(null);
            }
            ctx.Response.Redirect(ctx.RedirectUri);
            return Task.FromResult<object>(null);
          }
        };
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      //configure logger
      loggerFactory.AddConsole(Configuration.GetSection("Logging"));
      loggerFactory.AddDebug();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
      }
      else
      {
        app.UseExceptionHandler("/error");
      }

      // configure CORS
      app.UseCors(cors =>
        cors
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
        );

      // Configure Authentication
      var scheme = Configuration.GetValue<string>("Authentication:Scheme");
      app.UseCookieAuthentication(new CookieAuthenticationOptions()
      {
        AuthenticationScheme = scheme,
        DataProtectionProvider = new EphemeralDataProtectionProvider()
      });

      // Configure Routing

      // Route requests to root for client side routing
      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404)
        {
          context.Request.Path = "/";
          await next();
        }
      });

      app.UseFileServer(enableDirectoryBrowsing: false);

      app.UseMvc(routes =>
        {
          // Matches requests that correspond to an existent controller/action pair
          routes.MapRoute(
                name: "api",
                template: "api/{controller=Version}/{action=Index}/{id?}");
        });

      // Enable middleware to serve generated Swagger as a JSON endpoint
      app.UseSwagger();

      // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
      app.UseSwaggerUi();
    }

    private AuthHeaderHttpClient ProvideAuthHeaderHttpClient()
    {
      var baseUrl = Configuration.GetValue<string>("AuthHeaderClient:BaseUrl");
      var useProxy = Configuration.GetValue<bool>("AuthHeaderClient:Proxy:On");
      var host = Configuration.GetValue<string>("AuthHeaderClient:Proxy:Host");
      var port = Configuration.GetValue<int>("AuthHeaderClient:Proxy:Port");

      var proxy = (useProxy) ? new Proxy(host, port) : null;
      var cookies = new CookieContainer();
      var handler = new HttpClientHandler
      {
        CookieContainer = cookies,
        UseCookies = true,
        UseDefaultCredentials = false,
        Proxy = proxy,
        UseProxy = useProxy
      };
      var contextAccessor = new HttpContextAccessor();
      var client = new AuthHeaderHttpClient(contextAccessor, handler) { BaseAddress = new Uri(baseUrl) };
      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      return client;
    }

    private ApiKeyHttpClient ProvideApiKeyHttpClient()
    {
      var baseUrl = Configuration.GetValue<string>("ApiKeyClient:BaseUrl");
      var useProxy = Configuration.GetValue<bool>("ApiKeyClient:Proxy:On");
      var apiKey = Configuration.GetValue<string>("ApiKeyClient:ApiKey");
      var host = Configuration.GetValue<string>("ApiKeyClient:Proxy:Host");
      var port = Configuration.GetValue<int>("ApiKeyClient:Proxy:Port");
      var proxy = (useProxy) ? new Proxy(host, port) : null;
      var cookies = new CookieContainer();
      var handler = new HttpClientHandler
      {
        CookieContainer = cookies,
        UseCookies = true,
        UseDefaultCredentials = false,
        Proxy = proxy,
        UseProxy = useProxy
      };
      var client = new ApiKeyHttpClient(handler) { BaseAddress = new Uri(baseUrl) };
      client.DefaultRequestHeaders.Accept.Clear();
      client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      client.DefaultRequestHeaders.Add("ApiKey", apiKey);
      return client;
    }
  }
}
