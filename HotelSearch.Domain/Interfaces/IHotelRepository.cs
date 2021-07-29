using HotelSearch.Domain.DbEntities;
using System.Collections.Generic;

namespace HotelSearch.Domain
{
    public interface IHotelRepository
    {
        IList<Hotel> GetHotels(HotelFilter filter = null);
    }
}