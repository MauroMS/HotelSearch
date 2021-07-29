using HotelSearch.Domain;
using HotelSearch.Domain.DbEntities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HotelSearch.Data
{
    public class HotelRepository : IHotelRepository
    {
        private HotelDbContext _hotelDbContext;
        public HotelRepository(HotelDbContext hotelDbContext)
        {
            _hotelDbContext = hotelDbContext;
        }

        public IList<Hotel> GetHotels(HotelFilter filter = null)
        {
            if (filter == null)
                return _hotelDbContext.Hotels.ToList();

            return _hotelDbContext.Hotels.Where(h =>
            (String.IsNullOrEmpty(filter.Name) || h.Name.Contains(filter.Name, StringComparison.InvariantCultureIgnoreCase))
            && (filter.Rating == 0 || h.Rating == filter.Rating)
            && (!filter.OnlyAvailable || h.IsAvailable == 1)).ToList();
        }
    }
}
