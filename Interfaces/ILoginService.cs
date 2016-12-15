using System.Threading.Tasks;
using Angular2AspNetCoreStarter.Models;

namespace Angular2AspNetCoreStarter.Interfaces
{
  public interface ILoginServiceService
  {
     User Login(string username, string password);
  }
}
