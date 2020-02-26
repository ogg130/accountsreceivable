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
    public class StatusLevelController : ControllerBase
    {
        private readonly Context _context;

        public StatusLevelController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/statusLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StatusLevel>>> GetStatusLevel()
        {
            return await _context.StatusLevel.ToListAsync();
        }

        // GET: api/v1/statusLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StatusLevel>> GetStatusLevel(int id)
        {
            var statusHistoryLevel = await _context.StatusLevel.FindAsync(id);

            if (statusHistoryLevel == null)
            {
                return NotFound();
            }

            return statusHistoryLevel;
        }

        // PUT: api/v1/statusLevels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusLevel(int id, StatusLevel statusHistoryLevel)
        {
            if (id != statusHistoryLevel.ID)
            {
                return BadRequest();
            }

            _context.Entry(statusHistoryLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusLevelExists(id))
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

        // POST: api/v1/statusLevels
        [HttpPost]
        public async Task<ActionResult<StatusLevel>> PostStatusLevel(StatusLevel statusHistoryLevel)
        {
            _context.StatusLevel.Add(statusHistoryLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusLevel", new { id = statusHistoryLevel.ID }, statusHistoryLevel);
        }

        // DELETE: api/v1/statusLevels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StatusLevel>> DeleteStatusLevel(int id)
        {
            var statusHistoryLevel = await _context.StatusLevel.FindAsync(id);
            if (statusHistoryLevel == null)
            {
                return NotFound();
            }

            _context.StatusLevel.Remove(statusHistoryLevel);
            await _context.SaveChangesAsync();

            return statusHistoryLevel;
        }

        private bool StatusLevelExists(int id)
        {
            return _context.StatusLevel.Any(e => e.ID == id);
        }
    }
}