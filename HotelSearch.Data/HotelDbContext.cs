using HotelSearch.Domain.DbEntities;
using Microsoft.EntityFrameworkCore;

namespace HotelSearch.Data
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
        { }

        public DbSet<Hotel> Hotels { get; set; }
    }
}
