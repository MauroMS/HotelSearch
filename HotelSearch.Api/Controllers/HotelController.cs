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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Get single Hotel by Id</returns>
        [HttpGet]
        [Route("{id:int}")]
        public ActionResult<HotelViewModel> Get(int id)
        {
            try
            {
                var hotel = _hotelService.GetHotelById(id);
                
                if(hotel != null)
                    return Ok(hotel);

                return NotFound();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }
        }
    }
}
