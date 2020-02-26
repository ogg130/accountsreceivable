using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Statuses.Data.Model;

namespace Statuses.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StatusHistoryController : ControllerBase
    {
        private readonly Context _context;

        public StatusHistoryController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/statusHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusHistory>>> GetStatusHistory()
        {
            var x = await _context.StatusHistory.ToListAsync();
            return x;
        }

        // GET: api/v1/statusHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusHistory>> GetStatusHistory(int id)
        {
            var statusHistory = await _context.StatusHistory.FindAsync(id);

            if (statusHistory == null)
            {
                return NotFound();
            }

            return statusHistory;
        }

        // PUT: api/v1/statusHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusHistory(int id, StatusHistory statusHistory)
        {
            if (id != statusHistory.ID)
            {
                return BadRequest();
            }

            _context.Entry(statusHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusHistoryExists(id))
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

        // POST: api/v1/statusHistories
        [HttpPost]
        public async Task<ActionResult<StatusHistory>> PostStatusHistory(StatusHistory statusHistory)
        {
            _context.StatusHistory.Add(statusHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusHistory", new { id = statusHistory.ID }, statusHistory);
        }

        // DELETE: api/v1/statusHistories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StatusHistory>> DeleteStatusHistory(int id)
        {
            var statusHistory = await _context.StatusHistory.FindAsync(id);
            if (statusHistory == null)
            {
                return NotFound();
            }

            _context.StatusHistory.Remove(statusHistory);
            await _context.SaveChangesAsync();

            return statusHistory;
        }

        private bool StatusHistoryExists(int id)
        {
            return _context.StatusHistory.Any(e => e.ID == id);
        }
    }
}