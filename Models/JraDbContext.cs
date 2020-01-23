using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jrascraping.Models
{
    public class JraDbContext : DbContext
    {
        public JraDbContext(DbContextOptions options)
       : base(options) { }
        public DbSet<RaceResults> RaceResults { get; set; }
        public DbSet<CnameTable> CnameTable { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
        optionsBuilder.UseSqlite("Data Source=JRA.db");
    }
}
