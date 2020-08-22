using BikeRental.Core;

namespace BikeRental.ViewModels
{
    public class BikeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ushort Price { get; set; }
        public string Type { get; set; }
        public Status Status { get; set; }
    }
}