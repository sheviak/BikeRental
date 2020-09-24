namespace BikeRental.Core.Options
{
    public class UploadPhotoApiOptions
    {
        public string ApiUrl { get; set; }
        public string PostMethod { get; set; }
        public string AuthorizationSheme { get; set; }
        public string AuthorizationToken { get; set; }
        public string SecretKey { get; set; }
        public string NameFiledSecretKey { get; set; }
        public string NameFieldImage { get; set; }
    }
}