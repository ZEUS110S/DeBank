using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApi.Models;
using System.Security.Cryptography;

namespace ServerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public UsersController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpPost("Login")]
        public async Task<ActionResult<Users>> PostUsers(string USERNAME, string PASSWORD)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            string str_md5 = "";
            byte[] mang = System.Text.Encoding.UTF8.GetBytes(PASSWORD);
            MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
            mang = my_md5.ComputeHash(mang);

            foreach (byte b in mang)
            {
                str_md5 += b.ToString("X2");
            }
            PASSWORD = str_md5;
            var users = await _context.Users.Where(x => x.USERNAME == USERNAME && x.PASSWORD == PASSWORD).ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }
            // PUT: api/Users/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.USER_ID)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Signup")]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            var temp = _context.Users.Where(x => x.USERNAME == users.USERNAME && x.PASSWORD == users.PASSWORD && x.FULLNAME == users.FULLNAME && x.EMAIL == users.EMAIL ).FirstOrDefault();
            if (temp == null)
            {
                // convert to md5 hash
                string str_md5 = "";
                byte[] mang = System.Text.Encoding.UTF8.GetBytes(users.PASSWORD);
                MD5CryptoServiceProvider my_md5 = new MD5CryptoServiceProvider();
                mang = my_md5.ComputeHash(mang);

                foreach (byte b in mang)
                {
                    str_md5 += b.ToString("X2");
                }
                users.PASSWORD = str_md5;

                _context.Users.Add(users);
                await _context.SaveChangesAsync();
            }

            return Ok(users);

        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return (_context.Users?.Any(e => e.USER_ID == id)).GetValueOrDefault();
        }
    }
}
