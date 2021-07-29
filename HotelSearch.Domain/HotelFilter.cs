using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HotelSearch.Domain
{
    public class HotelFilter
    {
        public string Name { get; set; }
        public int Rating { get; set; }
        public bool OnlyAvailable { get; set; }
    }
}
