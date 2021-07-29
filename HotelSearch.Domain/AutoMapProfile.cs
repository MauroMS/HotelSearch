using AutoMapper;
using HotelSearch.Domain.DbEntities;
using HotelSearch.Domain.ViewModelEntities;

namespace HotelSearch.Domain
{
    public class AutoMapProfile : Profile
    {
        public AutoMapProfile()
        {
            CreateMap<Hotel, HotelViewModel>()
                .ReverseMap();
        }
    }
}
