using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace ServerApi.Models
{
    public class Questions
    {


        [Key]
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int QUESTION_ID { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string QUESTION_TITLE { get; set; }

        [Required]

        public int SUBJECT_ID { get; set; }

        [Required]
        public int USER_ID { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string ANSWER_1 { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string ANSWER_2 { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string ANSWER_3 { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string ANSWER_4 { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string ANSWER { get; set; }


        [Column(TypeName = "varchar(10)")]
        public string DIFFICULTY { get; set; }

        public int GRADE { get; set; }



    }
}
