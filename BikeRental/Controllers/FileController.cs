using System.Threading.Tasks;
using AutoMapper;
using BikeRental.Bl.Interface;
using BikeRental.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BikeRental.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : Controller
    {
        private readonly IBikeService bikeService;
        private readonly IMapper mapper;

        public FileController(IBikeService bikeService , IMapper mapper)
        {
            this.bikeService = bikeService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhotoToBike([FromForm] UploadPhotoBikeViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bike = await this.bikeService.UploadPhotoToBike(model.Avatar, model.BikeId);
            var bikeVm = this.mapper.Map<BikePhotoViewModel>(bike);

            return Ok(bikeVm);
        }
    }
}
