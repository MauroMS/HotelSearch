﻿using HotelSearch.Domain.DbEntities;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HotelSearch.Data
{
    public class HotelDbContextSeedData
    {
        private HotelDbContext _context;

        public HotelDbContextSeedData(HotelDbContext context)
        {
            _context = context;
        }

        public async void SeedHotels(string path)
        {
            var hotelsJson = File.ReadAllText($"{path}\\hotels.json");
            var hotels = JsonSerializer.Deserialize<List<Hotel>>(hotelsJson);

            _context.AddRange(hotels);

            await _context.SaveChangesAsync();
        }
    }
}


