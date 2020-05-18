using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 税区分テーブル
    /// </summary>
    [Table("tax")]
    public class Tax
    {
        /// <summary>
        /// 税区分ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("tax_id", TypeName = "int(1)")]
        public int TaxId { set; get; }

        /// <summary>
        /// 甲欄か乙欄か
        /// </summary>
        [Column("tax_kind", TypeName = "varchar(2)")]
        public string TaxKind { set; get; }
    }
}
