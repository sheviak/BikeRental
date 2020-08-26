using BikeRental.Core;
using System.Collections.Generic;

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
    }
}