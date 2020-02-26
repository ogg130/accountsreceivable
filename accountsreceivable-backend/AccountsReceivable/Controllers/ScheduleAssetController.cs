using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccountsReceivable.Data.Model;

namespace AccountsReceivable.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ScheduleAssetController : ControllerBase
    {
        private readonly Context _context;

        public ScheduleAssetController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/scheduleAssets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleAsset>>> GetAsset()
        {
            return await _context.ScheduleAsset.ToListAsync();
        }

        // GET: api/v1/scheduleAssets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleAsset>> GetAsset(int id)
        {
            var scheduleAsset = await _context.ScheduleAsset.FindAsync(id);

            if (scheduleAsset == null)
            {
                return NotFound();
            }

            return scheduleAsset;
        }

        // PUT: api/v1/scheduleAssets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, ScheduleAsset scheduleAsset)
        {
            if (id != scheduleAsset.ScheduleAssetID)
            {
                return BadRequest();
            }

            _context.Entry(scheduleAsset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleAssetExists(id))
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

        // POST: api/v1/scheduleAssets
        [HttpPost]
        public async Task<ActionResult<ScheduleAsset>> PostAsset(ScheduleAsset scheduleAsset)
        {
            _context.ScheduleAsset.Add(scheduleAsset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsset", new { id = scheduleAsset.ScheduleAssetID }, scheduleAsset);
        }

        // DELETE: api/v1/scheduleAssets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ScheduleAsset>> DeleteAsset(int id)
        {
            var scheduleAsset = await _context.ScheduleAsset.FindAsync(id);
            if (scheduleAsset == null)
            {
                return NotFound();
            }

            _context.ScheduleAsset.Remove(scheduleAsset);
            await _context.SaveChangesAsync();

            return scheduleAsset;
        }

        private bool ScheduleAssetExists(int id)
        {
            return _context.ScheduleAsset.Any(e => e.ScheduleAssetID == id);
        }
    }
}
