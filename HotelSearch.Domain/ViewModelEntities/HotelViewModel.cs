namespace HotelSearch.Domain.ViewModelEntities
{
    public class HotelViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public string Location { get; set; }
        public byte IsAvailable { get; set; }
    }
}
