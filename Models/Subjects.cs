using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models
{
    public class Subjects
    {
        [System.ComponentModel.DataAnnotations.Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int SUBJECT_ID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string SUBJECT_NAME { get; set; }
    }
}
