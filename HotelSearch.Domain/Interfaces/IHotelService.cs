using HotelSearch.Domain.ViewModelEntities;
using System.Collections.Generic;

namespace HotelSearch.Domain
{
    public interface IHotelService
    {
        IList<HotelViewModel> GetHotels(string name = null, int rating = 0, bool onlyAvailable = true);
        HotelViewModel GetHotelById(int id);
    }
}