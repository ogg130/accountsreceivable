using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CostCenters.Data.Model;

namespace CostCenters.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CostCenterController : ControllerBase
    {
        private readonly Context _context;

        public CostCenterController(Context context)
        {
            _context = context;
        }

        // GET: api/v1/costCenters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CostCenter>>> GetCostCenter()
        {
            return await _context.CostCenter.ToListAsync();
        }

        // GET: api/v1/costCenters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CostCenter>> GetCostCenter(int id)
        {
            var costCenter = await _context.CostCenter.FindAsync(id);

            if (costCenter == null)
            {
                return NotFound();
            }

            return costCenter;
        }

        // PUT: api/v1/costCenters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCostCenter(int id, CostCenter costCenter)
        {
            if (id != costCenter.ID)
            {
                return BadRequest();
            }

            _context.Entry(costCenter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CostCenterExists(id))
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

        // POST: api/v1/costCenters
        [HttpPost]
        public async Task<ActionResult<CostCenter>> PostCostCenter(CostCenter costCenter)
        {
            _context.CostCenter.Add(costCenter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCostCenter", new { id = costCenter.ID }, costCenter);
        }

        // DELETE: api/v1/costCenters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CostCenter>> DeleteCostCenter(int id)
        {
            var costCenter = await _context.CostCenter.FindAsync(id);
            if (costCenter == null)
            {
                return NotFound();
            }

            _context.CostCenter.Remove(costCenter);
            await _context.SaveChangesAsync();

            return costCenter;
        }

        private bool CostCenterExists(int id)
        {
            return _context.CostCenter.Any(e => e.ID == id);
        }
    }
}