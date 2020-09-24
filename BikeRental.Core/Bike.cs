namespace BikeRental.Core
{
    public class Bike : BaseEntity
    {
        public string Name { get; set; }
        public Status Status { get; set; }
        public float Price { get; set; }

        public BikeType BikeType { get; set; }
        public int BikeTypeId { get; set; }

        public string Photo { get; set; }
    }
}