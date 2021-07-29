using AutoMapper;
using HotelSearch.Data;
using HotelSearch.Domain;
using HotelSearch.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Linq;
using Xunit;

namespace HotelSearch.Tests
{
    public class HotelServiceTest
    {
        private readonly HotelDbContext _hotelDbContext;
        private readonly IHotelRepository _hotelRepository;
        private readonly IHotelService _hotelService;
        private Mock<ILogger<HotelService>> _iLogger;
        public HotelServiceTest()
        {
            //InMem Db Setup
            var builder = new DbContextOptionsBuilder<HotelDbContext>();
            builder.UseInMemoryDatabase(databaseName: "HotelDbTest");

            var dbContextOptions = builder.Options;
            _hotelDbContext = new HotelDbContext(dbContextOptions);


            //Seed Fake Data
            HotelDbContextSeedData seedData = new HotelDbContextSeedData(_hotelDbContext);
            seedData.SeedHotels(AppContext.BaseDirectory);

            //Setup AutoMapper
            var config = new MapperConfiguration(opts =>
            {
                opts.AddProfile(new AutoMapProfile());
            });
            var mapper = config.CreateMapper();

            //Setup Service/Repository to use InMem Db
            _iLogger = new Mock<ILogger<HotelService>>();
            _hotelRepository = new HotelRepository(_hotelDbContext);
            _hotelService = new HotelService(_hotelRepository, mapper, _iLogger.Object);
        }

        [Fact]
        public void Should_Load_Hotel_Data()
        {
            Assert.NotEmpty(_hotelService.GetHotels());
        }

        [Fact]
        public void Should_Return_All_Hotels()
        {
            Assert.True(_hotelService.GetHotels(onlyAvailable: false).Count == 100);
        }

        [Fact]
        public void Should_Return_All_Available_Hotels_FilterByOnlyAvailable()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                OnlyAvailable = true
            };

            Assert.DoesNotContain(_hotelService.GetHotels(onlyAvailable: hotelFilter.OnlyAvailable), h => h.IsAvailable == 0);
        }

        [Fact]
        public void Should_Return_Hotels_FilterByName_NotCaseSensitive()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Name = "Con"
            };

            Assert.All(_hotelService.GetHotels(name: hotelFilter.Name), h => Assert.True(h.Name.Contains(hotelFilter.Name,StringComparison.InvariantCultureIgnoreCase)));
        }

        [Fact]
        public void Should_Return_Hotels_FilterByRating_5()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Rating = 5
            };

            Assert.All(_hotelService.GetHotels(rating: hotelFilter.Rating), h => Assert.True(h.Rating == 5));
        }

        [Fact]
        public void Should_Return_Hotels_FilterByRating_4()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Rating = 4
            };

            Assert.All(_hotelService.GetHotels(rating: hotelFilter.Rating), h => Assert.True(h.Rating == 4));
        }

        [Fact]
        public void Should_Return_Hotels_FilterByRating_3()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Rating = 3
            };

            Assert.All(_hotelService.GetHotels(rating: hotelFilter.Rating), h => Assert.True(h.Rating == 3));
        }

        [Fact]
        public void Should_Return_Hotels_FilterByRating_2()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Rating = 2
            };

            Assert.All(_hotelService.GetHotels(rating: hotelFilter.Rating), h => Assert.True(h.Rating == 2));
        }

        [Fact]
        public void Should_Return_Hotels_FilterByRating_1()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Rating = 1
            };

            Assert.All(_hotelService.GetHotels(rating: hotelFilter.Rating), h => Assert.True(h.Rating == 1));
        }

        [Fact]
        public void Should_Return_Hotels_MultipleAllFilters()
        {
            HotelFilter hotelFilter = new HotelFilter()
            {
                Name = "Con",
                Rating = 5,
                OnlyAvailable = true
            };

            Assert.True(_hotelService.GetHotels(hotelFilter.Name, hotelFilter.Rating, hotelFilter.OnlyAvailable).Count > 0);
        }
    }
}
