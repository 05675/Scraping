using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.Models
{
    public class RaceInfo
    {
        public string CountOfDay { get; set; }
        public string RaceName { get; set; }
        public DateTime Date { get; set; }
        public string PlaceDate { get; set; }
        public string ShippingTime { get; set; }
        public string Weather { get; set; }
        public string Baba { get; set; }
        public string BabaState { get; set; }
        public string Old { get; set; }
        public string Class { get; set; }
        public string Distance { get; set; }
        public string Around { get; set; }
        public string PrizeMoney { get; set; }
        public string LoadPrize { get; set; }
        public PayBack Refund { get; set; }
    }
}
