using System.Collections.Generic;
using AutoMapper;
using BikeRental.Bl.Interface;
using BikeRental.Core;
using BikeRental.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BikeRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BikeController : ControllerBase
    {
        private readonly IBikeService bikeService;
        private readonly IMapper mapper;

        public BikeController(IBikeService bikeService, IMapper mapper)
        {
            this.bikeService = bikeService;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            var bikes = this.bikeService.GetBikes();
            var bikesVm = this.mapper.Map<IEnumerable<BikeViewModel>>(bikes);

            return Ok(bikesVm);
        }

        [HttpGet("types")]
        public IActionResult GetBikeTypes()
        {
            var bikeTypes = this.bikeService.GetBikeTypes();
            var bikeTypesVm = this.mapper.Map<IEnumerable<BikeTypesViewModel>>(bikeTypes);

            return Ok(bikeTypesVm);
        }

        [HttpPost]
        public IActionResult Post(InsertBikeViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bike = this.mapper.Map<Bike>(model);
            var result = this.bikeService.InsertBike(bike);
            var bikeVm = this.mapper.Map<BikeViewModel>(result);

            return Ok(bikeVm);
        }   

        [HttpPut]
        public IActionResult Put(EditBikeViewModel model)
        {
            if (!this.bikeService.CheckIfBikeExist(model.Id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var bike = this.mapper.Map(model, this.bikeService.GetBike(model.Id));
            var result = this.bikeService.UpdateBike(bike);
            var bikeVm = this.mapper.Map<BikeViewModel>(result);

            return Ok(bikeVm);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if(this.bikeService.CheckIfBikeExist(id))
            {
                this.bikeService.DeleteBike(id);
                return Ok();
            }

            return NotFound();
        }

        [HttpPut("change-status")]
        public IActionResult ChangeStatus([FromBody] int id)
        {
            if (!this.bikeService.CheckIfBikeExist(id))
                return NotFound();

            var bike = this.bikeService.ChangeBikeStatus(id);
            var bikeVm = this.mapper.Map<BikeViewModel>(bike);

            return Ok(bikeVm);
        }
    }
}