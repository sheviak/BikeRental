using System.Collections.Generic;

namespace BikeRental.Core
{
    public class BikeType : BaseEntity
    {
        public string Name { get; set; }

        public IEnumerable<Bike> Bikes { get; set; }
    }
}