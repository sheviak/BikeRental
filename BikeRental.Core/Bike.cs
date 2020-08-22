namespace BikeRental.Core
{
    public class Bike : BaseEntity
    {
        public string Name { get; set; }
        public Status Status { get; set; }
        public ushort Price { get; set; }

        public BikeType BikeType { get; set; }
        public int BikeTypeId { get; set; }
    }
}