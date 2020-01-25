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

        public int Id { get; set; }
        public string Racename { get; set; }
        public string Cname { get; set; }
    }
}
