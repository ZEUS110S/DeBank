using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models
{
    public class CreatedPDF
    {
        [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int QUESTION_ID { get; set; }

        public int SUBJECT_ID { get; set; }

        public int USER_ID { get; set; }
    }
}