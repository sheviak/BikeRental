using AutoMapper;
using BikeRental.Core;
using BikeRental.ViewModels;
using BikeRental.ViewModels.Auth;

namespace BikeRental.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Bike, BikeViewModel>()
                .ForMember(x => x.Type, x => x.MapFrom(x => x.BikeType.Name));

            CreateMap<Bike, BikePhotoViewModel>()
                .ForMember(x => x.Type, x => x.MapFrom(x => x.BikeType.Name));

            CreateMap<InsertBikeViewModel, Bike>();
            CreateMap<EditBikeViewModel, Bike>();

            CreateMap<BikeType, BikeTypesViewModel>();

            CreateMap<RegisterViewModel, ApplicationUser>()
                .ForMember(x => x.UserName, x => x.MapFrom(x => x.Email));
        }
    }
}