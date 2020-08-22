using System.Collections.Generic;
using AutoMapper;
using BikeRental.Bl.Interface;
using BikeRental.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BikeRental.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiControllers : ControllerBase
    {
        private readonly IBikeService bikeService;
        private readonly IMapper mapper;

        public ApiControllers(IBikeService bikeService, IMapper mapper)
        {
            this.bikeService = bikeService;
            this.mapper = mapper;
        }


        [HttpGet("get")]
        public IEnumerable<BikeViewModel> Get()
        {
            var bikes = this.bikeService.GetBikes();
            var bikesVm = this.mapper.Map<IEnumerable<BikeViewModel>>(bikes);

            return bikesVm;
        }

        [HttpGet("get/{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ApiControllers>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}