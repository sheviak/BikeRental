using BikeRental.Bl.Interface;
using BikeRental.Core;
using BikeRental.Dal.Interface;
using System.Collections.Generic;

namespace BikeRental.Bl.Services
{
    public class BikeService : IBikeService
    {
        private readonly IUnitOfWork unitOfWork;

        public BikeService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<Bike> GetBikes()
        {
            var bikes = this.unitOfWork.Repository<Bike>().Get("BikeType");

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

            return bike;
        }

        public Bike UpdateBike(Bike bike)
        {
            this.unitOfWork.Repository<Bike>().Update(bike);
            this.unitOfWork.Save();

            return bike;
        }
    }
}