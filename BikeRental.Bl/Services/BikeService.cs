using BikeRental.Bl.Interface;
using BikeRental.Core;
using BikeRental.Dal.Interface;
using System.Collections.Generic;
using System.Linq;

namespace BikeRental.Bl.Services
{
    public class BikeService : IBikeService
    {
        private readonly IUnitOfWork unitOfWork;

        public BikeService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
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
    }
}