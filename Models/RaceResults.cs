using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.Models
{
    public class RaceResults
    {
        public string Date { get; set; }
        public string Racename { get; set; }
        public string Place { get; set; }
        public int Waku { get; set; }
        public int Num { get; set; }
        public string Horse { get; set; }
        public string Age { get; set; }
        public string Weight { get; set; }
        public string Jockey { get; set; }
        public string Margin { get; set; }
        public string Time { get; set; }
        public int Corner { get; set; }
        public string F_time { get; set; }
        public string H_weight { get; set; }
        public string Trainer { get; set; }
        public int Pop { get; set; }
    }
}
