using BikeRental.Core;
using System.Collections.Generic;

namespace BikeRental.Bl.Interface
{
    public interface IBikeService
    {
        IEnumerable<Bike> GetBikes();
        Bike InsertBike(Bike bike);
        Bike UpdateBike(Bike bike);
        void DeleteBike(int bikeId);
    }
}