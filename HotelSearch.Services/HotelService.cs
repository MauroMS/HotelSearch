using AutoMapper;
using HotelSearch.Domain;
using HotelSearch.Domain.ViewModelEntities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace HotelSearch.Services
{
    public class HotelService : IHotelService
    {
        private readonly ILogger<HotelService> _logger;
        private IHotelRepository _hotelRepository;
        private IMapper _mapper;

        public HotelService(IHotelRepository hotelRepository, IMapper mapper, ILogger<HotelService> logger)
        {
            _hotelRepository = hotelRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public IList<HotelViewModel> GetHotels(string name = null, int rating = 0, bool onlyAvailable = true)
        {
            try
            {
                HotelFilter hotelFilter = new HotelFilter()
                {
                    Name = name,
                    Rating = rating,
                    OnlyAvailable = onlyAvailable
                };

                var hotels = _hotelRepository.GetHotels(hotelFilter);
                return _mapper.Map<IList<HotelViewModel>>(hotels);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }

        public HotelViewModel GetHotelById(int id)
        {
            try
            {
                var hotel = _hotelRepository.GetHotelById(id);
                if (hotel != null)
                    return _mapper.Map<HotelViewModel>(hotel);

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }
        }
    }
}
