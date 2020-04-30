using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Yayoi.Employees.Models
{
    /// <summary>
    /// 役職テーブル
    /// </summary>
    [Table("position")]
    public class Position
    {
        /// <summary>
        /// 役職ID
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("position_id", TypeName = "int(4)")]
        public int PositionId { set; get; }

        /// <summary>
        /// 役職名
        /// </summary>
        [Column("position_name", TypeName = "varchar(6)")]
        public string PositionName { set; get; }
    }
}
