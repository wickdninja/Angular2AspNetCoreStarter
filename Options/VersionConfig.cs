using System.Linq;

namespace Angular2AspNetCoreStarter.Options
{
    public class VersionConfig
    {
        public string Version { get; set; }
        public string Type { get; set; }
        public string Spec { get; set; }

        public string Major
        {
            get
            {
                return Version.Split('.').First();
            }
        }

        public string Minor
        {
            get
            {
                return Version.Split('.').Skip(1).First();
            }
        }

        public string Patch
        {
            get
            {
                return Version.Split('.').Last();
            }
        }
    }
}
