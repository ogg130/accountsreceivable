using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Users.Data.Model;

namespace Users.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PhoneNumberController : ControllerBase
    {
        private readonly Context _context;

        public PhoneNumberController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/phoneNumber
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhoneNumberDto>>> GetPhoneNumber()
        {
            var phoneNumbers = await _context.PhoneNumber.ToListAsync();
            var dtoList = new List<PhoneNumberDto>();
            foreach (var number in phoneNumbers)
            {
                var dto = new PhoneNumberDto
                {
                    ID = number.ID,
                    Type = number.Type,
                    Number = number.Number,
                    UserID = number.UserID,
                    EnteredDate = number.EnteredDate,
                    EnteredByID = number.EnteredByID
                };
                dtoList.Add(dto);
            }
            return dtoList;
        }

        // GET: api/v1/phoneNumber/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhoneNumberDto>> GetPhoneNumber(int id)
        {
            var number = await _context.PhoneNumber.FindAsync(id);

            if (number == null)
            {
                return NotFound();
            }

            var dto = new PhoneNumberDto
            {
                ID = number.ID,
                Type = number.Type,
                Number = number.Number,
                UserID = number.UserID,
                EnteredDate = number.EnteredDate,
                EnteredByID = number.EnteredByID
            };

            return dto;
        }

        // PUT: api/v1/phoneNumber/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhoneNumber(int id, PhoneNumber phoneNumber)
        {
            if (id != phoneNumber.ID)
            {
                return BadRequest();
            }

            _context.Entry(phoneNumber).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhoneNumberExists(id))
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

        // POST: api/v1/phoneNumber
        [HttpPost]
        public async Task<ActionResult<PhoneNumber>> PostPhoneNumber(PhoneNumber phoneNumber)
        {
            _context.PhoneNumber.Add(phoneNumber);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhoneNumber", new { id = phoneNumber.ID }, phoneNumber);
        }

        // DELETE: api/v1/phoneNumber/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PhoneNumber>> DeletePhoneNumber(int id)
        {
            var phoneNumber = await _context.PhoneNumber.FindAsync(id);
            if (phoneNumber == null)
            {
                return NotFound();
            }

            _context.PhoneNumber.Remove(phoneNumber);
            await _context.SaveChangesAsync();

            return phoneNumber;
        }

        private bool PhoneNumberExists(int id)
        {
            return _context.PhoneNumber.Any(e => e.ID == id);
        }
    }
}