using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Yayoi.Employees.Controllers;
using Yayoi.Employees.Models;

namespace Yayoi.Employees.Dao
{
    public class EmployeeDao
    {
        private EmployeeContext employeeContext;
        public EmployeeDao(EmployeeContext employeeContext)// コンストラクタ
        {
            this.employeeContext = employeeContext;
        }
        public (int totalItemCount, int lastPage, List<Employee> list) GetEmployees(int page, int countPerPage)
        {
            List<Employee> employees = employeeContext.Employees.OrderBy(e=>e.EmployeeId).Skip(countPerPage * (page - 1)).Take(countPerPage).ToList();
            int totalItemCount = employeeContext.Employees.Count();

            int lastPage = (int)Math.Floor((decimal)totalItemCount / countPerPage);
            if (totalItemCount % countPerPage > 0)
                lastPage++;

            return (totalItemCount, lastPage, employees);
        }
    }
}
