using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Yayoi.Employees.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Yayoi.Employees.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeController: ControllerBase
    {
        private readonly EmployeeContext _context;
        public EmployeeController(EmployeeContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// 従業員情報の一覧を返します。
        /// </summary>
        /// <param name="page">ページ番号</param>
        /// <returns>従業員情報の一覧</returns>
        [HttpGet]
        public IActionResult GetEmployees(int page = 1)
        {
            //1ページあたりの最大表示件数
            var countPerPage = 10;
            try
            {
                var list = this.GetEmployeeInformation(_context);
                var totalPage = this.CountTotalPages(list.Count(), countPerPage);
                if (0 < page && page <= totalPage)
                {
                    this.Response.Headers.Add("Links", this.CreateLinksHeader("Employee", page, totalPage));
                    List<Employee> employees = list
                        .OrderBy(e => e.EmployeeId)
                        .Skip(countPerPage * (page - 1))
                        .Take(countPerPage).ToList();
                    return Ok(employees);
                }
                else
                {
                    return NotFound();
                }
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
                var employees = this.GetEmployeeInformation(_context);
                return Ok(employees.First(emp => emp.EmployeeId == employeeId));
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
        private IEnumerable<Employee> GetEmployeeInformation(EmployeeContext context)
        {
            return context.Employees
                .Include(employee => employee.Gender)
                .Include(employee => employee.Department)
                .Include(employee => employee.Tax)
                .Include(employee => employee.WorkingStatus)
                .Include(employee => employee.Position);
        }
        /// <summary>
        /// GetEmployeeInformationメソッドで求める合計データと1ページ内に表示するデータ件数を元に合計ページ数を返します。
        /// </summary>
        /// <param name="totalItemCount">Employyeのデータ件数の合計</param>
        /// <param name="countPerPage">1ページあたりの最大表示件数</param>
        /// <returns>ページングの合計</returns>
        private int CountTotalPages(int totalItemCount, int countPerPage)
        {
            var remainder = totalItemCount % countPerPage;
            var totalPageCount = totalItemCount / countPerPage + (remainder == 0 ? 0 : 1);
            return totalPageCount;
        }

        /// <summary>
        /// ページング用のLinkヘッダ値を作成します。
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="currentPage"></param>
        /// <param name="lastPage"></param>
        /// <returns>ページング用のLinkヘッダ値</returns>
        private string CreateLinksHeader(string controller, int currentPage, int lastPage)
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
    }
}