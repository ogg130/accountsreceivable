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
    public class ScheduleTypeController : ControllerBase
    {
        private readonly Context _context;

        public ScheduleTypeController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/scheduleTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleType>>> GetType()
        {
            return await _context.ScheduleType.ToListAsync();
        }

        // GET: api/v1/scheduleType/1 or
        // GET: api/v1/scheduleType/1?asset=true - get by ScheduleAssetId
        [HttpGet("{id}")]
        public async Task<ActionResult<List<ScheduleType>>> GetType(int id, bool? asset = false)
        {
            var scheduleTypes = new List<ScheduleType>();

            if (asset == true)
            {
               scheduleTypes = await _context.ScheduleType.Where(r=>r.ScheduleAssetID == id).ToListAsync();
            }
            else
            {
               scheduleTypes = await _context.ScheduleType.Where(r => r.ScheduleTypeID == id).ToListAsync();
            }

            if (scheduleTypes == null)
            {
                return NotFound();
            }

            return scheduleTypes;
        }

        // GET: api/v1/scheduleType/1/value/123456.01
        [HttpGet("{id}/value/{amount}")]
        public async Task<ActionResult<List<decimal>>> GetType(int id, decimal amount)
        {
            // Given the schedule id, find its term in years and then calculate the average of the amount / terms
            // to display in the uis depreciation schedule

            var schedule = await _context.ScheduleType.FirstOrDefaultAsync(r => r.ScheduleTypeID == id);

            if (schedule == null)
            {
                return NotFound();
            }

            var term = schedule.Term;
            
            var scheduleValues = new List<decimal>();

            // Iterate as many times as there are years in the term
            for (var i = 0; i < 10; ++i) {
                // Add the value of amount divided by term to the list to display as a yearly cost

                // Need to round the value
                if (term > i)
                {
                    var yearlyCost = Math.Round((amount / term), 2);
                    scheduleValues.Add(yearlyCost);
                }
                else
                {
                    scheduleValues.Add(0);
                }


            }

            return scheduleValues;
        }

        // PUT: api/v1/scheduleTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutType(int id, ScheduleType scheduleType)
        {
            if (id != scheduleType.ScheduleTypeID)
            {
                return BadRequest();
            }

            _context.Entry(scheduleType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleTypeExists(id))
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

        // POST: api/v1/scheduleTypes
        [HttpPost]
        public async Task<ActionResult<ScheduleType>> PostType(ScheduleType scheduleType)
        {
            _context.ScheduleType.Add(scheduleType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetType", new { id = scheduleType.ScheduleTypeID }, scheduleType);
        }

        // DELETE: api/v1/scheduleTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ScheduleType>> DeleteType(int id)
        {
            var scheduleType = await _context.ScheduleType.FindAsync(id);
            if (scheduleType == null)
            {
                return NotFound();
            }

            _context.ScheduleType.Remove(scheduleType);
            await _context.SaveChangesAsync();

            return scheduleType;
        }

        private bool ScheduleTypeExists(int id)
        {
            return _context.ScheduleType.Any(e => e.ScheduleTypeID == id);
        }
    }
}
