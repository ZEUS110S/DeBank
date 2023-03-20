using Microsoft.EntityFrameworkCore;
using ServerApi.Models;

namespace ServerApi.Models
{
    public class QuizDbContext : DbContext
    {
        private string connectionStrings;
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options)
        {

        }
        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<CreatedPDF> CreatedPDF { get; set; }
        public DbSet<Users> Users { get; set; }

        internal object Where(Func<object, object> value)
        {
            throw new NotImplementedException();
        }

        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
           => optionsBuilder.UseSqlServer("Data Source =DESKTOP-0IJAB33\\SQLEXPRESS; initial catalog=DeBank; trusted_connection=yes;Encrypt=False");
    }*/
    }
}