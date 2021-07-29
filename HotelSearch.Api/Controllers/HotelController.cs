using HotelSearch.Domain;
using HotelSearch.Domain.ViewModelEntities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace HotelSearch.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="rating"></param>
        /// <param name="onlyAvailable"></param>
        /// <param name="sortOrder"></param>
        /// <returns>List of Hotels unfiltered/Filtered</returns>
        [HttpGet]
        public ActionResult<IList<HotelViewModel>> Get(string name, int rating, bool onlyAvailable = true)
        {
            try
            {
                var hotels = _hotelService.GetHotels(name, rating, onlyAvailable);
                return Ok(hotels);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.InnerException);
            }            
        }
    }
}
