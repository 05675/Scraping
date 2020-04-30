using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 性別テーブル
    /// </summary>
    [Table("gender")]
    public class Gender
    {
        /// <summary>
        /// 性別ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("gender_id", TypeName = "int(1)")]
        public int GenderId { set; get; }

        /// <summary>
        /// 性別
        /// </summary>
        [Column("gender_value", TypeName = "varchar(2)")]
        public string GenderValue { set; get; }

    }
}
