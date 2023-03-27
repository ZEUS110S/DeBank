using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApi.Models;
using System.Linq;
using Microsoft.IdentityModel.Tokens;

namespace ServerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questions>>> GetQuestions()
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            return await _context.Questions.ToListAsync();
        }

        // GET: api/Questions/5
        [HttpGet("SUBJECT_NAME,DIFFICULTY")]
        public async Task<ActionResult<Questions>> GetQuestions(string SUBJECT_NAME, string DIFFICULTY)
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            var query = (from q in _context.Questions
                        join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                        join u in _context.Users on q.USER_ID equals u.USER_ID
                        select new
                        {   
                            q.QUESTION_ID,
                            q.QUESTION_TITLE,
                            q.GRADE,
                            s.SUBJECT_NAME,
                            u.USERNAME,
                            q.DIFFICULTY,
                            q.ANSWER_1,
                            q.ANSWER_2,
                            q.ANSWER_3,
                            q.ANSWER_4,
                        }).ToList() ;

            var questions = query.Where(x => x.SUBJECT_NAME == SUBJECT_NAME && x.DIFFICULTY == DIFFICULTY).ToList();

            if (questions == null)
            {
                return NotFound();
            }

            return Ok(questions);
        }

        [HttpGet("SUBJECT_NAME")]
        public async Task<ActionResult<Questions>> GetQuestions1(string SUBJECT_NAME)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var query = (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         join u in _context.Users on q.USER_ID equals u.USER_ID
                         select new
                         {
                             q.QUESTION_ID,
                             q.QUESTION_TITLE,
                             q.GRADE,
                             s.SUBJECT_NAME,
                             u.USERNAME,
                             q.DIFFICULTY,
                             q.ANSWER_1,
                             q.ANSWER_2,
                             q.ANSWER_3,
                             q.ANSWER_4,
                         }).ToList();

            var questions = query.Where(x => x.SUBJECT_NAME == SUBJECT_NAME).ToList();

            if (questions == null)
            {
                return NotFound();
            }

            return Ok(questions);
        }
        [HttpGet("USERNAME")]
        public async Task<ActionResult<Questions>> GetQuestions4 (string USERNAME)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var query = (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         join u in _context.Users on q.USER_ID equals u.USER_ID
                         select new
                         {
                             q.QUESTION_ID,
                             q.QUESTION_TITLE,
                             q.GRADE,
                             s.SUBJECT_NAME,
                             u.USERNAME,
                             q.DIFFICULTY,
                             q.ANSWER_1,
                             q.ANSWER_2,
                             q.ANSWER_3,
                             q.ANSWER_4,
                         }).ToList();

            var questions = query.Where(x => x.USERNAME == USERNAME).ToList();

            if (questions == null)
            {
                return NotFound();
            }

            return Ok(questions);
        }


        [HttpGet("SUBJECT_NAME,USERNAME")]
        public async Task<ActionResult<Questions>> GetQuestions2(string SUBJECT_NAME ,string USERNAME)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var query = (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         join u in _context.Users on q.USER_ID equals u.USER_ID
                         select new
                         {
                             q.QUESTION_ID,
                             q.QUESTION_TITLE,
                             q.GRADE,
                             s.SUBJECT_NAME,
                             u.USERNAME,
                             q.DIFFICULTY,
                             q.ANSWER_1,
                             q.ANSWER_2,
                             q.ANSWER_3,
                             q.ANSWER_4,
                         }).ToList();

            var questions = query.Where(x => x.SUBJECT_NAME == SUBJECT_NAME && x.USERNAME == USERNAME).ToList();

            if (questions == null)
            {
                return NotFound();
            }

            return Ok(questions);
        }

        /*[HttpPost("Create Question")]
        public async Task<ActionResult<Questions>> PostQuestions(string QUESTION_TITLE, string SUBJECT_NAME, string USERNAME, string ANSWER_1, string ANSWER_2, string ANSWER_3, string ANSWER_4, string ANSWER)
        { 

            var query = (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         join u in _context.Users on q.USER_ID equals u.USER_ID
                         select new
                         {
                             q.QUESTION_ID,
                             q.QUESTION_TITLE,
                             s.SUBJECT_NAME,
                             q.SUBJECT_ID,
                             q.USER_ID,
                             u.USERNAME,
                             q.DIFFICULTY,
                             q.ANSWER_1,
                             q.ANSWER_2,
                             q.ANSWER_3,
                             q.ANSWER_4,
                             q.ANSWER,
                         }).ToList();
            var query1= (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         where s.SUBJECT_NAME equals SUBJECT_NAME 
                select ne
                         )

            var questions = query.Where(x => x.QUESTION_TITLE == QUESTION_TITLE && x.SUBJECT_NAME == SUBJECT_NAME && x.USERNAME == USERNAME && x.ANSWER_1 == ANSWER_1 && x.ANSWER_2 == ANSWER_2 && x.ANSWER_3 == ANSWER_3 && x.ANSWER_4 == ANSWER_4 && x.ANSWER == ANSWER).ToList();

            if (questions == null)
            {
                _context.Questions.Add(questions);
                await _context.SaveChangesAsync();
            }
            Console.WriteLine("This Question is exists");
            return Ok();
        }*/


        [HttpGet("SUBJECT_NAME,DIFFICULTY,USERNAME")]
        public async Task<ActionResult<Questions>> GetQuestions3(string SUBJECT_NAME, string DIFFICULTY,string USERNAME)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var query = (from q in _context.Questions
                         join s in _context.Subjects on q.SUBJECT_ID equals s.SUBJECT_ID
                         join u in _context.Users on q.USER_ID equals u.USER_ID
                         select new
                         {
                             q.QUESTION_ID,
                             q.QUESTION_TITLE,
                             q.GRADE,
                             s.SUBJECT_NAME,
                             u.USERNAME,
                             q.DIFFICULTY,
                             q.ANSWER_1,
                             q.ANSWER_2,
                             q.ANSWER_3,
                             q.ANSWER_4,
                         }).ToList();

            var questions = query.Where(x => x.SUBJECT_NAME == SUBJECT_NAME && x.DIFFICULTY == DIFFICULTY && x.USERNAME == USERNAME).ToList();

            if (questions == null)
            {
                return NotFound();
            }

            return Ok(questions);
        }







        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Questions>> PostQuestions1(Questions questions)
        {

            if (_context.Questions == null)
            {
                return NotFound();
            }
            var temp = _context.Questions.Where(x => x.QUESTION_TITLE == questions.QUESTION_TITLE && x.GRADE == questions.GRADE && x.SUBJECT_ID == questions.SUBJECT_ID && x.USER_ID == questions.USER_ID && x.DIFFICULTY == questions.DIFFICULTY && x.ANSWER_1 == questions.ANSWER_1 && x.ANSWER_2 == questions.ANSWER_2 && x.ANSWER_3 == questions.ANSWER_3 && x.ANSWER_4 == questions.ANSWER_4 && x.ANSWER == questions.ANSWER).FirstOrDefault();

            if (temp == null)
            {
                _context.Questions.Add(questions);
                await _context.SaveChangesAsync();
            }

            return Ok(questions);
        }


        [HttpPost]
        [Route("GetAnswer")]
        public async Task<ActionResult<Questions>> RetrieveAnswer(int[] question_id)
        {
            var answer = await (_context.Questions
                .Where(x => question_id.Contains(x.QUESTION_ID))
                .Select(y => new
                {
                    QUESTION_ID = y.QUESTION_ID,
                    QUESTION_TITLE = y.QUESTION_TITLE,
                    GRADE = y.GRADE,
                    DIFFICULTY = y.DIFFICULTY,
                    SUBJECT_ID = y.SUBJECT_ID,
                    ANSWERS = new string[] { y.ANSWER_1, y.ANSWER_2, y.ANSWER_3, y.ANSWER_4 },
                    ANSWER = y.ANSWER
                })).ToListAsync();
            return Ok(answer);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestions(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var questions = await _context.Questions.FindAsync(id);
            if (questions == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(questions);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionsExists(int id)
        {
            return (_context.Questions?.Any(e => e.QUESTION_ID == id)).GetValueOrDefault();
        }
    }
}
