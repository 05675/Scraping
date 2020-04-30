using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Yayoi.Employees.Models
{
    public class EntityContext: DbContext
    {
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<CommutingExpense> CommutingExpenses { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
    }
}
