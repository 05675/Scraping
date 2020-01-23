using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.Models
{
    [Table("CnameTable")]
    public class CnameTable
    {
        public string Racename { get; set; }
        public string Cname { get; set; }
    }
}
