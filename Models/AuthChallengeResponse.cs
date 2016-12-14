namespace Angular2AspNetCoreStarter.Models
{
    public class AuthChallengeResponse
    {
        public string Salt { get; set; }

        public string Challenge { get; set; }

        public string PinSalt { get; set; }

        public bool IsValid()
        {
            return !string.IsNullOrEmpty(Salt) && !string.IsNullOrEmpty(Challenge);
        }
    }
}
