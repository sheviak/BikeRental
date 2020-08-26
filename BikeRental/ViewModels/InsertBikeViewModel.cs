using System.ComponentModel.DataAnnotations;

namespace BikeRental.ViewModels
{
    public class InsertBikeViewModel 
    {
        [Required(ErrorMessage = "Bike name is required.")]
        public string Name { get; set; }

        [Required]
        [Range(0, float.MaxValue, ErrorMessage = "The price should be $0 or most.")]
        public float Price { get; set; }

        [Required(ErrorMessage = "Bike type is required. Select bike type.")]
        public int? BikeTypeId { get; set; }
    }
}