using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Yayoi.Employees.Controllers;
using Yayoi.Employees.Models;
using Microsoft.AspNetCore.Mvc;

namespace Yayoi.Employees.Tests.Controllers
{
    [TestClass]
    public class EmployeeControllerTest
    {
        [TestCategory("Get")]
        [TestMethod]
        public void Get_正常系_従業員情報を取得()
        {
            var employeeController = this.GetFakeEmployeeController();
            IActionResult getResult = employeeController.Get();
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
