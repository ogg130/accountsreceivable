using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using PurchaseRequisitionsMock.Data.Model;

namespace PurchaseRequisitionsMock.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PrController : ControllerBase
    {
        private readonly Context _context;

        public PrController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/pr
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pr>>> GetPr()
        {
            return await _context.Pr.ToListAsync();
        }

        // GET: api/v1/pr/5
        [HttpGet("{arNumber}")]
        public async Task<ActionResult<List<Pr>>> GetPr(int arNumber)
        {
            var prs = await _context.Pr.Where(r => r.ArNumber == arNumber).ToListAsync();

            if (prs == null)
            {
                return NotFound();
            }

            return prs;
        }

        // GET: api/v1/pr/total/5
        [HttpGet("total/{arNumber}")]
        public async Task<ActionResult<double>> GetTotal(int arNumber)
        {
            var pr = await _context.Pr.Where(r => r.ArNumber == arNumber).ToListAsync();

            if (pr == null)
            {
                return NotFound();
            }

            var sum = pr.Sum(r => r.Amount);

            return sum;
        }

        // PUT: api/v1/pr/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPr(int id, Pr pr)
        {
            if (id != pr.ID)
            {
                return BadRequest();
            }

            _context.Entry(pr).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrExists(id))
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

        // POST: api/v1/pr
        [HttpPost]
        public async Task<ActionResult<Pr>> PostPr(Pr pr)
        {
            _context.Pr.Add(pr);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPr", new { id = pr.ID }, pr);
        }

        // DELETE: api/v1/pr/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Pr>> DeletePr(int id)
        {
            var pr = await _context.Pr.FindAsync(id);
            if (pr == null)
            {
                return NotFound();
            }

            _context.Pr.Remove(pr);
            await _context.SaveChangesAsync();

            return pr;
        }

        private bool PrExists(int id)
        {
            return _context.Pr.Any(e => e.ID == id);
        }
    }
}