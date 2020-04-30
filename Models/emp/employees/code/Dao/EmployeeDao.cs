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
        public EmployeeDao(EmployeeContext employeeContext)
        {
            this.employeeContext = employeeContext;
        }
        public IEnumerable<Employee> GetEmployeeInformation(EmployeeContext employeeContext)
        {
            return employeeContext.Employees
                .Include(employee => employee.Gender)
                .Include(employee => employee.Department)
                .Include(employee => employee.Tax)
                .Include(employee => employee.WorkingStatus)
                .Include(employee => employee.Position);
        }

        private List<Employee> _dummyEmployeeData = new List<Employee>();

        public EmployeeDao()
        {
            var test = GetEmployeeInformation(employeeContext);

            for (int i = 0; i < 100; i++)
            {
                this._dummyEmployeeData.Add(
                  new Employee()
                  {
                      EmployeeId = i,
                      FirstName = "しゃいん",
                      LastName = i.ToString() + "号",
                  });
            }
        }

        public (int totalItemCount, int lastPage, List<Employee>) GetEmployees(int page, int countPerPage)
        {
            List<Employee> employees = _dummyEmployeeData.Skip(countPerPage * (page - 1)).Take(countPerPage).ToList();
            int totalItemCount = _dummyEmployeeData.Count();

            int lastPage = (int)Math.Floor((decimal)totalItemCount / countPerPage);
            if (totalItemCount % countPerPage > 0)
                lastPage++;

            return (totalItemCount, lastPage, employees);
        }
    }
}
