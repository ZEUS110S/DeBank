using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models
{
    public class Users
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int USER_ID { get; set; }

        [Column(TypeName = "varchar20")]
        public string USERNAME { get; set; }

        [Column(TypeName = "varchar20")]
        public string PASSWORD { get; set; }

        [Column(TypeName = "varchar50")]
        public string FULLNAME { get; set; }


        [Column(TypeName = "varchar50")]
        public string EMAIL { get; set; }
    }
}