using BikeRental.Attributes;
using BikeRental.Core;
using System.ComponentModel.DataAnnotations;

namespace BikeRental.ViewModels
{
    public class EditBikeViewModel : InsertBikeViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Status is required. Select bike status.")]
        [ValidEnumStatus(ErrorMessage = "Status can be between Free or Rented.")]
        public Status Status { get; set; }
    }
}