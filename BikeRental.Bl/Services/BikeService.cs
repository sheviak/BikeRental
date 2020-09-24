using BikeRental.Bl.Interface;
using BikeRental.Core;
using BikeRental.Dal.Interface;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using BikeRental.Core.Options;
using Microsoft.Extensions.Options;
using System.Net.Http;
using System;
using System.Net.Http.Headers;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

namespace BikeRental.Bl.Services
{
    public class BikeService : IBikeService
    {
        private readonly UploadPhotoApiOptions options;
        private readonly IUnitOfWork unitOfWork;

        public BikeService(IUnitOfWork unitOfWork, IOptions<UploadPhotoApiOptions> uploadPhotoOptions)
        {
            this.unitOfWork = unitOfWork;
            this.options = uploadPhotoOptions.Value;
        }

        public Bike GetBike(int id)
        {
            var bike = this.unitOfWork.Repository<Bike>().Get(id);
            return bike;
        }

        public IEnumerable<Bike> GetBikes()
        {
            var bikes = this.unitOfWork.Repository<Bike>().Get(includeProperties: "BikeType");
            return bikes;
        }

        public void DeleteBike(int bikeId)
        {
            this.unitOfWork.Repository<Bike>().Delete(bikeId);
            this.unitOfWork.Save();
        }

        public Bike InsertBike(Bike bike)
        {
            this.unitOfWork.Repository<Bike>().Insert(bike);
            this.unitOfWork.Save();

            return GetBikeById(bike.Id);
        }

        public Bike UpdateBike(Bike bike)
        {
            this.unitOfWork.Repository<Bike>().Update(bike);
            this.unitOfWork.Save();

            return GetBikeById(bike.Id);
        }

        public IEnumerable<BikeType> GetBikeTypes()
        {
            var bikeTypes = this.unitOfWork.Repository<BikeType>().Get();
            return bikeTypes;
        }

        public Bike ChangeBikeStatus(int bikeId)
        {
            var bike = this.unitOfWork.Repository<Bike>().Get(filter: x => x.Id == bikeId, includeProperties: "BikeType").FirstOrDefault();
            bike.Status = bike.Status == Status.Free ? Status.Rented : Status.Free;
            this.unitOfWork.Save();

            return bike;
        }

        public bool CheckIfBikeExist(int bikeId) => this.unitOfWork.Repository<Bike>().Get(bikeId) != null;

        private Bike GetBikeById(int id) => this.unitOfWork.Repository<Bike>().Get(filter: x => x.Id == id, includeProperties: "BikeType").FirstOrDefault();

        public async Task<Bike> UploadPhotoToBike(IFormFile avatar, int bikeId)
        {
            var bike = this.unitOfWork.Repository<Bike>().Get(bikeId);
            if (bike is null)
                throw new Exception($"Bike with Id {bikeId} is not found!");

            var link = await this.GetPhotoLink(avatar);

            bike.Photo = link;
            this.unitOfWork.Save();

            return bike;
        }

        private async Task<string> GetPhotoLink(IFormFile avatar)
        {
            using var client = new HttpClient
            {
                BaseAddress = new Uri(this.options.ApiUrl)
            };

            client.DefaultRequestHeaders
                  .Accept
                  .Add(new MediaTypeWithQualityHeaderValue("application/json"));

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(this.options.AuthorizationSheme, this.options.AuthorizationToken);

            using var ms = new MemoryStream();
            await avatar.CopyToAsync(ms);
            var fileBytes = ms.ToArray();

            using var formData = new MultipartFormDataContent
            {
                { new StringContent(this.options.SecretKey), this.options.NameFiledSecretKey },
                { new StreamContent(new MemoryStream(fileBytes)), this.options.NameFieldImage, avatar.FileName }
            };

            var response = await client.PostAsync(this.options.PostMethod, formData).Result.Content.ReadAsStringAsync();
            var link = JObject.Parse(response).SelectToken("data.link").ToString();

            return link;
        }
    }
}