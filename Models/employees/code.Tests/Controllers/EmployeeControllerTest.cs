using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Yayoi.Employees.Controllers;
using Yayoi.Employees.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Http;
using Moq;
using System.Collections.Generic;

namespace Yayoi.Employees.Tests.Controllers
{
    [TestClass]
    public class EmployeeControllerTest
    {
        private EmployeeContext _context;
        private EmployeeController _controller;

        private readonly string _employeesRecord001 = @"{""EmployeeId"": ""1"", ""LastName"": ""睦月"", ""FirstName"": ""太郎"", ""BirthDay"": ""1995, 3, 31"", ""HireDay"": ""2018, 4, 1"", ""GenderId"": ""0"", ""DepartmentId"": ""0"", ""TaxId"": ""0"", ""WorkingStatusId"": ""0"", ""PositionId"": ""0""}";
        private readonly string _employeesRecord002 = @"{""EmployeeId"": ""2"", ""LastName"": ""如月"", ""FirstName"": ""太郎"", ""BirthDay"": ""1995, 3, 31"", ""HireDay"": ""2018, 4, 1"", ""GenderId"": ""0"", ""DepartmentId"": ""0"", ""TaxId"": ""0"", ""WorkingStatusId"": ""0"", ""PositionId"": ""0""}";

        private readonly Employee employee = new Employee
        {
            EmployeeId = 1,
            LastName = "弥生",
            FirstName = "太郎",
            BirthDay = new DateTime(1995, 3, 31),
            HireDay = new DateTime(2018, 4, 1),
            GenderId = 0,
            DepartmentId = 0,
            TaxId = 0,
            WorkingStatusId = 0,
            PositionId = 0,
        };

        public interface IProudct
        {
            string GetContent(string url);
        }

        [TestInitialize]
        public void Setup()
        {
            // ダミーのDBコンテキストを生成
            var options = new DbContextOptionsBuilder<EmployeeContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
            _context = new EmployeeContext(options);

            // ダミーのDBコンテキストからHTTPコンテキストを持ったコントローラーを生成
            _controller = new EmployeeController(_context);
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };

            // CreateLinksHeaderメソッドのUrlの準備
            var mock = new Mock<IUrlHelper>(MockBehavior.Strict);
            mock.Setup(x => x.Link(It.IsAny<string>(), It.IsAny<object>()))
                .Returns("https://localhost:44361/employee")
                .Verifiable();
            _controller.Url = mock.Object;
        }

        public void Cleanup()
        {
            // ダミーのDBコンテキストを破棄
            _context.Dispose();
        }

        [TestCategory("Get")]
        [TestMethod]
        public void GetEmployees_正常系_従業員情報を取得()
        {
            List<Employee> i = new List<Employee>();
            i.Add(new Employee() { EmployeeId = 1, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 2, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 3, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 4, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 5, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 6, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 7, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 8, FirstName = "弥生", LastName = "太郎" });
            i.Add(new Employee() { EmployeeId = 9, FirstName = "弥生", LastName = "太郎" });
            //i.Add(new Employee() { EmployeeId = 10, FirstName = "弥生", LastName = "太郎" });
            //i.Add(new Employee() { EmployeeId = 11, FirstName = "弥生", LastName = "太郎" });
            //i.Add(new Employee() { EmployeeId = 12, FirstName = "弥生", LastName = "太郎" });

            // タスクレコードをコンテキストに追加
            for (var x = 0; x < i.Count; x++)
            {
                _context.Employees.Add(i[x]);
            }
            _context.SaveChangesAsync();

            //var inputEmployeeRequestList = new List<Employee>();
            //inputEmployeeRequestList.Add(JsonSerializer.Deserialize<Employee>(_employeesRecord001));
            //inputEmployeeRequestList.Add(JsonSerializer.Deserialize<Employee>(_employeesRecord002));
            //foreach (Employee inputEmployeeRequest in inputEmployeeRequestList)
            //{
            //    _dbControl.InsertEmployeesRecord(_context, new Employee()
            //    {
            //        EmployeeId = inputEmployeeRequest.EmployeeId,
            //        LastName = inputEmployeeRequest.LastName,
            //        FirstName = inputEmployeeRequest.FirstName,
            //        BirthDay = inputEmployeeRequest.BirthDay,
            //        HireDay = inputEmployeeRequest.HireDay,
            //        GenderId = inputEmployeeRequest.GenderId,
            //        DepartmentId = inputEmployeeRequest.DepartmentId,
            //        TaxId = inputEmployeeRequest.TaxId,
            //        WorkingStatusId = inputEmployeeRequest.WorkingStatusId,
            //        PositionId = inputEmployeeRequest.PositionId,
            //    });
            //}



            // Act
            var getResult = _controller.GetEmployees();

            // Assert
            Assert.AreEqual(200, (getResult as OkObjectResult).StatusCode);
        }

        [TestCategory("Get")]
        [TestMethod]
        public void GetEmployees_異常系_従業員情報を取得()
        {
            // タスクレコードをコンテキストに追加
            _context.Employees.Add(employee);
            _context.SaveChangesAsync();

            // Act
            var getResult = _controller.GetEmployees(-1);

            // Assert
            Assert.AreEqual(404, (getResult as NotFoundResult).StatusCode);
        }

        [TestCategory("Get")]
        [TestMethod]
        public void Get_正常系_従業員情報を取得()
        {
            // タスクレコードをコンテキストに追加
            _context.Employees.Add(employee);
            _context.SaveChangesAsync();

            // Act
            var getResult = _controller.Get(1);

            // Assert
            Assert.AreEqual(200, (getResult as OkObjectResult).StatusCode);
        }

        [TestCategory("Get")]
        [TestMethod]
        public void Get_異常系_保存されていない従業員情報を取得()
        {
            var employeeController = this.GetFakeEmployeeController();
            var getResult = employeeController.Get(-1);
            Assert.AreEqual(404, (getResult as NotFoundObjectResult).StatusCode);
        }

        /// <summary>
        /// EmployeeControllerのMockを返します。
        /// </summary>
        /// <returns>EmployeeControllerのMock</returns>
        private EmployeeController GetFakeEmployeeController()
        {
            var options = new DbContextOptionsBuilder<EmployeeContext>().UseInMemoryDatabase(databaseName: "employee_info").Options;
            var employeeContext = new EmployeeContext(options);
            return new EmployeeController(employeeContext);
        }
    }
}
