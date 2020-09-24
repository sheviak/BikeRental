using BikeRental.Core;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BikeRental.Bl.Interface
{
    public interface IBikeService
    {
        Bike GetBike(int id);
        IEnumerable<Bike> GetBikes();
        Bike InsertBike(Bike bike);
        Bike UpdateBike(Bike bike);
        void DeleteBike(int bikeId);

        Bike ChangeBikeStatus(int bikeId);
        IEnumerable<BikeType> GetBikeTypes();
        bool CheckIfBikeExist(int bikeId);
        Task<Bike> UploadPhotoToBike(IFormFile avatar, int bikeId);
    }
}