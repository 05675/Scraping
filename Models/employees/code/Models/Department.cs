using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 部署テーブル
    /// </summary>
    [Table("department")]
    public class Department
    {
        /// <summary>
        /// 部署ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("department_id", TypeName = "int(4)")]
        public int DepartmentId { set; get; }

        /// <summary>
        /// 部署名
        /// </summary>
        [Column("department_name", TypeName = "varchar(6)")]
        public string DepartmentName { set; get; }
    }
}
