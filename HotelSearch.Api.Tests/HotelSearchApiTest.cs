using HotelSearch.Api.Controllers;
using HotelSearch.Domain;
using HotelSearch.Domain.ViewModelEntities;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace HotelSearch.Api.Tests
{
    public class HotelSearchApiTest
    {
        Mock<IHotelService> _hotelService;
        HotelController _hotelController;
        public HotelSearchApiTest()
        {
            _hotelService = new Mock<IHotelService>();
            _hotelController = new HotelController(_hotelService.Object);
        }

        [Fact]
        public void Get_AllAvailableHotels_Should_Returns_1_Item()
        {
            HotelFilter filter = new HotelFilter()
            {
                Name = "Con",
                OnlyAvailable = true,
                Rating = 5,
            };

            List<HotelViewModel> hotels = new List<HotelViewModel>();
            hotels.Add(new HotelViewModel()
            {
                Id = 1,
                Name = "Incon Tempus Eu Institute",
                Description = "Lorem ipsum",
                Rating = 5,
                Location = "Svalbard and Jan Mayen Islands",
                IsAvailable = 1
            });

            _hotelService.Setup(x => x.GetHotels(filter.Name, filter.Rating, filter.OnlyAvailable)).Returns(hotels);
                        
            var result = _hotelController.Get(filter.Name, filter.Rating, filter.OnlyAvailable);
            var okResult = result.Result as OkObjectResult;

            Assert.IsType<List<HotelViewModel>>(okResult.Value);
            Assert.Equal(hotels, (okResult.Value as List<HotelViewModel>));
            Assert.Single((okResult.Value as List<HotelViewModel>));
        }

        [Fact]
        public void Get_AllAvailableHotels_Should_Return_0_Item()
        {
            HotelFilter filter = new HotelFilter()
            {
                Name = "Con",
                OnlyAvailable = true,
                Rating = 5,
            };

            List<HotelViewModel> hotels = new List<HotelViewModel>();
            _hotelService.Setup(x => x.GetHotels(filter.Name, filter.Rating, filter.OnlyAvailable)).Returns(hotels);

            var result = _hotelController.Get(filter.Name, filter.Rating, filter.OnlyAvailable);
            var okResult = result.Result as OkObjectResult;

            Assert.IsType<List<HotelViewModel>>(okResult.Value);
            Assert.Equal(hotels, (okResult.Value as List<HotelViewModel>));
            Assert.Empty((okResult.Value as List<HotelViewModel>));
        }

        [Fact]
        public void Get_AllHotels_Should_ReturnsOkResult()
        {
            HotelFilter filter = new HotelFilter()
            {
                Name = "Con",
                OnlyAvailable = true,
                Rating = 5,
            };

            List<HotelViewModel> hotels = new List<HotelViewModel>();
            hotels.Add(new HotelViewModel()
            {
                Id = 1,
                Name = "Incon Tempus Eu Institute",
                Description = "Lorem ipsum",
                Rating = 5,
                Location = "Svalbard and Jan Mayen Islands",
                IsAvailable = 1
            });
            _hotelService.Setup(x => x.GetHotels(filter.Name, filter.Rating, filter.OnlyAvailable)).Returns(hotels);


            var okResult = _hotelController.Get(filter.Name, filter.Rating, filter.OnlyAvailable);


            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Get_AllHotels_Should_ThrowException()
        {
            HotelFilter filter = new HotelFilter()
            {
                Name = "Con",
                OnlyAvailable = true,
                Rating = 5,
            };

            List<HotelViewModel> hotels = new List<HotelViewModel>();
            _hotelService.Setup(x => x.GetHotels(filter.Name, filter.Rating, filter.OnlyAvailable)).Throws(new Exception(""));


            var badRequest = _hotelController.Get(filter.Name, filter.Rating, filter.OnlyAvailable);


            Assert.IsType<BadRequestObjectResult>(badRequest.Result);
        }
    }
}
