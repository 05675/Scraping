using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.Models
{
    public class HorseInfo
    {
        public string HorseName { get; set; }
        public string Father { get; set; }
        public string Mother { get; set; }
        public string MotherFather { get; set; }
        public string MotherMother { get; set; }
        public string Sex { get; set; }
        public DateTime Birthday { get; set; }
        public string CoatColor { get; set; }
        public string HorseNameMeaning { get; set; }
        public string HorseOwner { get; set; }
        public string Trainer { get; set; }
        public string ProductionRanch { get; set; }
        public string Origin { get; set; }
    }
}
