using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Data.Model;
using Users.Utils;

namespace Users.Controllers
{    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Context _context;

        public UserController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.Include(r => r.PhoneNumbers).Include(r => r.Roles).ToListAsync();
        }

        // GET: api/v1/user/5
        [HttpGet("{userName}")]
        public async Task<ActionResult<User>> GetUser(string userName)
        {
            var user = await _context.User.Include(r => r.PhoneNumbers).Include(r => r.Roles).FirstOrDefaultAsync(r => r.UserName == userName);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/v1/user/director
        [HttpGet("director")]
        public async Task<ActionResult<List<User>>> GetDirector()
        {
            var directors = await _context.Role
                .Where(r => r.Value == "DIRECTOR")
                .ToListAsync();

            var users = new List<User>();
            foreach (var director in directors)
            {
                var user = await _context.User
                .Include(r => r.PhoneNumbers)
                .Include(r => r.Roles)
                .FirstOrDefaultAsync(r => r.UserID == director.UserID);

                users.Add(user);
            }

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // GET: api/v1/user/owner
        [HttpGet("owner")]
        public async Task<ActionResult<List<User>>> GetOwner()
        {
            var owners = await _context.Role.Where(r => r.Value == "OWNER").ToListAsync();

            var users = new List<User>();
            foreach (var owner in owners)
            {
                var user = await _context.User
                .Include(r => r.PhoneNumbers)
                .Include(r => r.Roles)
                .FirstOrDefaultAsync(r=>r.UserID == owner.UserID);
                
                users.Add(user);
            }

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }


        // PUT: api/v1/user/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/v1/user/login
        [HttpPost("login/{userName}")]
        public async Task<ActionResult<User>> Login(string userName, [FromBody] Login body)
        {

            // Get the user record because we need the users hashed/salted password
           var dbUser = await GetUser(userName);

            // Parse out the hash and the salt into separate objects
            string hash, userEntryHashed;
            CredentialsHasher.HashUserCredentials(body, dbUser, out hash, out userEntryHashed);

            // If the hashed salted user entry is the same as whats in the database for the user
            if (userEntryHashed == hash)
            {
                // They are clean, continue on.
                return Ok();
            }
            else
            {
                // Get outta here! - Bad credentials.
                return Unauthorized();
            }

        }

        private static void NewMethod(Login body, ActionResult<User> dbUser, out string hash, out string userEntryHashed)
        {
            hash = dbUser.Value.Hash;
            var salt = dbUser.Value.Salt;

            // Add the salt which we grabbed from the users db record to the password that the user entered
            userEntryHashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: body.Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }

        // POST: api/v1/user
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        }

        // DELETE: api/v1/user/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserID == id);
        }
    }
}