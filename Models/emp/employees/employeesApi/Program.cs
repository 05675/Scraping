using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Yayoi.Employees.Controllers;
using Yayoi.Employees.Dao;
using Yayoi.Employees.Models;

namespace employeesApi
{
    class Program
    {
        public Program() // コンストラクタ
        {
            // EmployeeDaoクラスのインスタンスをつくる

            var options = new DbContextOptionsBuilder<EmployeeContext>();
            var connectionString = "";  //　Server=localhost;Database=ef;User=root;Password=1234;
            options.UseMySql(connectionString);
            var context = new EmployeeContext(options.Options);

            var employeeDao = new EmployeeDao(context);
            // EmployeeDaoクラスのインスタンスを操作する
            var result = employeeDao.GetEmployees(1, 5);// 第一目標。　この関数を呼び出して動作（resultの中身）を確認したい！
            Console.WriteLine(result.totalItemCount);
            Console.WriteLine(result.lastPage);
            foreach (Employee employee in result.list)
            {
                //
                Console.WriteLine(employee.PositionId);
                Console.WriteLine(employee.WorkingStatusId);
            }
        }

    }
}
