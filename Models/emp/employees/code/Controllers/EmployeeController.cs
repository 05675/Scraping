using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Yayoi.Employees.Models;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;
using Yayoi.Employees.Dao;

namespace Yayoi.Employees.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController: ControllerBase
    {
        private EmployeeContext employeeContext;
        public EmployeeController(EmployeeContext employeeContext)
        {
            this.employeeContext = employeeContext;
        }

        const int CountPerPage = 5;

        [HttpPost]
        public IEnumerable<Employee> GetList([FromQuery] int page)
        {
            if (page < 1) // 1ページスタートなので、1未満は1に簡単に補正
                page = 1;

            // データ取得
            // 全件数、該当ページのEmployeeリスト
            var dao = new EmployeeDao(employeeContext);
            (int totalItemCount, int lastPage, List<Employee> employees) =
              dao.GetEmployees(page, EmployeeController.CountPerPage);

            // Response Header追加
            this.Response.Headers.Add("Links", this.CreateLinksHeader("Employee", page, lastPage));
            this.Response.Headers.Add("X-TotalItemCount", totalItemCount.ToString());
            this.Response.Headers.Add("X-CurrentPage", page.ToString());

            // Body Jsonは本来のデータのみ
            return employees;
        }

        /// <summary>
        /// Pagination用のLinkヘッダ値を作成
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="currentPage"></param>
        /// <param name="lastPage"></param>
        /// <returns></returns>
        protected string CreateLinksHeader(string controller, int currentPage, int lastPage)
        {
            List<string> links = new List<string>();

            links.Add(string.Format("<{0}>; rel=\"first\"", this.Url.Link("", new { Controller = controller, page = 1 })));
            if (currentPage > 1)
            {
                links.Add(string.Format("<{0}>; rel=\"prev\"", this.Url.Link("", new { Controller = controller, page = currentPage - 1 })));
            }
            if (currentPage < lastPage)
            {
                links.Add(string.Format("<{0}>; rel=\"next\"", this.Url.Link("", new { Controller = controller, page = currentPage + 1 })));
            }
            links.Add(string.Format("<{0}>; rel=\"last\"", this.Url.Link("", new { Controller = controller, page = lastPage })));

            return string.Join(", ", links);
        }


        /// <summary>
        /// 従業員情報の一覧を返します。
        /// </summary>
        /// <returns>従業員情報の一覧</returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(this.GetEmployeeInformation(employeeContext));
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception.Message);
            }
        }

        /// <summary>
        /// 指定したemployee_idと一致した従業員情報を返します。
        /// </summary>
        /// <param name="employeeId">従業員ID</param>
        /// <returns>指定したemployee_idと一致する従業員情報</returns>
        [HttpGet("{employeeId}")]
        public IActionResult Get(int employeeId)
        {
            try
            {
                var employuees = this.GetEmployeeInformation(employeeContext);
                return Ok(employuees.First(emp => emp.EmployeeId == employeeId));
            }
            catch (InvalidOperationException invalidOperationException)
            {
                // 登録されていないIDを指定された場合
                return NotFound(invalidOperationException.Message);
            }
            catch (Exception exception)
            {
                return StatusCode(500, exception.Message);
            }
        }

        /// <summary>
        /// 関連データ付きの従業員情報の集合を返します。
        /// </summary>
        /// <param name="context">EmployeeContext</param>
        /// <returns>関連データ付きの従業員の情報</returns>
        public IEnumerable<Employee> GetEmployeeInformation(EmployeeContext employeeContext)
        {
            return employeeContext.Employees
                .Include(employee => employee.Gender)
                .Include(employee => employee.Department)
                .Include(employee => employee.Tax)
                .Include(employee => employee.WorkingStatus)
                .Include(employee => employee.Position);
        }
    }
}