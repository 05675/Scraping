using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 住所テーブル
    /// </summary>
    [Table("address")]
    public class Address
    {
        /// <summary>
        /// 住所ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("address_id", TypeName = "int(4)")]
        public int AddressId { set; get; }

        /// <summary>
        /// 従業員ID
        /// </summary>
        [Column("employee_id", TypeName = "int(6)")]
        public int EmployeeId { set; get; }

        /// <summary>
        /// 電話番号
        /// </summary>
        [Column("telephone_number", TypeName = "varchar(14)")]
        public string? TelephoneNumber { set; get; }

        /// <summary>
        /// 郵便番号
        /// </summary>
        [Column("postal_code", TypeName = "varchar(8)")]
        public string? PostalCode { set; get; }

        /// <summary>
        /// 住所の詳細な情報
        /// </summary>
        [Column("address_detail", TypeName = "varchar(46)")]
        public string? AddressDetail { set; get; }

        /// <summary>
        /// EmployeeIdとの紐づけ
        /// </summary>
        [NotMapped]
        public Employee Employee { set; get; }
    }
}
