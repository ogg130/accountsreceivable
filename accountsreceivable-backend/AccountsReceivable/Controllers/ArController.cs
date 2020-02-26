using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccountsReceivable.Data.Model;
using AccountsReceivable.Services;
using Newtonsoft.Json;

namespace AccountsReceivable.Controllers
{
    [BasicAuth]
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ArController : ControllerBase
    {
        private readonly Context _context;

        private readonly IHttpClientSvc _httpClientSvc;

        private static Dictionary<int, string> costCenterList = new Dictionary<int, string>();
        private static Dictionary<int, string> ownerList = new Dictionary<int, string>();
        private static Dictionary<int, string> directorList = new Dictionary<int, string>();
        private static Dictionary<int, string> statusList = new Dictionary<int, string>();
        private static Dictionary<int, string> siteList = new Dictionary<int, string>();
        private static Dictionary<int, string> assetList = new Dictionary<int, string>();
        private static Dictionary<int, string> typeList = new Dictionary<int, string>();

        public ArController(Context context, IHttpClientSvc httpClientSvc)
        {
            _context = context;
            _httpClientSvc = httpClientSvc;
        }



        [HttpGet("report/1/owner/{id}")]
        public async Task<ActionResult<List<ArDto>>> GetReport(int id)
        {
    
            await SetLists();
            var ars = await _context.Ar.Where(a => a.OwnerID == id).ToListAsync();

            if (ars.Count == 0)
            {
                return NotFound();
            }

            var returnValue = new List<ArDto>();

            foreach (var ar in ars)
            {
                SetDto(returnValue, ar);
            }

            return returnValue;
        }

     

        [HttpGet("report/2")]
        public async Task<ActionResult<List<ArDto>>> GetReport()
        {
            await SetLists();
            var ars = await _context.Ar.Where(a => a.Status == 7).ToListAsync();

            if (ars.Count == 0)
            {
                return new List<ArDto>();
            }

            var returnValue = new List<ArDto>();

            foreach (var ar in ars)
            {
                SetDto(returnValue, ar);
            }

            return returnValue;
        }




        // GET: api/v1/ar/report/3 = projects having total amount over 50000.00

        [HttpGet("report/3")]
        public async Task<ActionResult<List<ArDto>>> GetTotalsReport(int id)
        {
            await SetLists();

            var ars = await _context.Ar.Where(a => a.Amount > 50000.00m).ToListAsync();

            if (ars.Count == 0)
            {
                    return NotFound();
            }

            var returnValue = new List<ArDto>();

            foreach (var ar in ars)
            {
                SetDto(returnValue, ar);
            }

            return returnValue;
        }

        // GET: api/v1/ar

        [HttpGet]
        public async Task<ActionResult<List<ArDto>>> GetAr()
        {
            await SetLists();

            var ars = await _context.Ar.ToListAsync();

            if (ars.Count == 0)
            {
                return NotFound();
            }

            var returnValue = new List<ArDto>();

            foreach (var ar in ars)
            {
                SetDto(returnValue, ar);
            }

            return returnValue;
        }

        // GET: api/v1/ar/5?arnumber=true - get by AR id
        // GET: api/v1/ar/1234567?arnumber=true - get by AR number
        [HttpGet("{id}")]
        public async Task<ActionResult<ArDto>> GetAr(int id, bool? arNumber = false)
        {
            await SetLists();
            var ar = new Ar();

            if (arNumber == true)
            {
                ar = await _context.Ar.FirstOrDefaultAsync(a => a.ArNumber == id.ToString());
            }
            else
            {
                ar = await _context.Ar.FirstOrDefaultAsync(a => a.ArID == id);
            }
            
            if (ar == null)
            {
                return NotFound();
            }

            var dto = new ArDto
            {
                ArID = ar.ArID,
                ArNumber = ar.ArNumber,
                CostCenter = costCenterList.FirstOrDefault(r => r.Key == ar.CostCenter).Value,
                ProjectName = ar.ProjectName,
                Director = directorList.FirstOrDefault(r => r.Key == ar.DirectorID).Value,
                ActualPercent = ar.ActualPercent,
                Owner = ownerList.FirstOrDefault(r => r.Key == ar.OwnerID).Value,
                Amount = ar.Amount,
                Committed = ar.Committed,
                EndDate = ar.EndDate.ToString("MM/dd/yyyy"),
                StartDate = ar.StartDate.Date.ToString("MM/dd/yyyy"),
                Benefits = ar.Benefits,
                Risks = ar.Risks,
                Purpose = ar.Purpose,
                Comments = ar.Comments,
                EnteredDate = ar.EnteredDate.ToString("MM/dd/yyyy"),
                Site = siteList.FirstOrDefault(r => r.Key == ar.SiteID).Value,
                Status = statusList.FirstOrDefault(r => r.Key == ar.Status).Value,
                Asset = assetList.FirstOrDefault(r => r.Key == ar.Asset).Value,
                Type = typeList.FirstOrDefault(r => r.Key == ar.Type).Value
            };

            return dto;
        
        }




        private async Task SetLists()
        {
            costCenterList.Clear();
            costCenterList = await GetCostCenterList("https://localhost:9001/api/v1/costcenter");

            ownerList.Clear();
            ownerList = await GetOwnerList("https://localhost:5001/api/v1/user");

            directorList.Clear();
            directorList = await GetDirectorList("https://localhost:5001/api/v1/user");

            statusList.Clear();
            statusList = await GetStatusList("https://localhost:4001/api/v1/statuslevel");

            siteList.Clear();
            siteList = await GetSiteList("https://localhost:7001/api/v1/site");

            assetList.Clear();
            assetList = await GetAssetList("https://localhost:6001/api/v1/scheduleasset");

            typeList.Clear();
            typeList = await GetTypeList("https://localhost:6001/api/v1/scheduletype");
        }




        private static void SetDto(List<ArDto> returnValue, Ar ar)
        {
            var dto = new ArDto
            {
                ArID = ar.ArID,
                ArNumber = ar.ArNumber,
                CostCenter = costCenterList.FirstOrDefault(r => r.Key == ar.CostCenter).Value,
                ProjectName = ar.ProjectName,
                Director = directorList.FirstOrDefault(r => r.Key == ar.DirectorID).Value,
                ActualPercent = ar.ActualPercent,
                Owner = ownerList.FirstOrDefault(r => r.Key == ar.OwnerID).Value,
                Amount = ar.Amount,
                Committed = ar.Committed,
                EndDate = ar.EndDate.ToString("MM/dd/yyyy"),
                StartDate = ar.StartDate.ToString("MM/dd/yyyy"),
                Benefits = ar.Benefits,
                Risks = ar.Risks,
                Purpose = ar.Purpose,
                Comments = ar.Comments,
                Site = siteList.FirstOrDefault(r => r.Key == ar.SiteID).Value,
                Status = statusList.FirstOrDefault(r => r.Key == ar.Status).Value,
                Asset = assetList.FirstOrDefault(r => r.Key == ar.Asset).Value,
                Type = typeList.FirstOrDefault(r => r.Key == ar.Type).Value,
                EnteredDate = ar.EnteredDate.ToString("MM/dd/yyyy")
            };
            returnValue.Add(dto);
        }

        private async Task<Dictionary<int, string>> GetAssetList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<ScheduleAsset>>(responseString);

            var scheduleAssets = new Dictionary<int, string>();

            foreach (var scheduleAsset in deserializedObject)
            {
                scheduleAssets.Add(scheduleAsset.ScheduleAssetID, $"{scheduleAsset.Value}");
            }
            return scheduleAssets;
        }

        private async Task<Dictionary<int, string>> GetTypeList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<ScheduleType>>(responseString);

            var scheduleTypes = new Dictionary<int, string>();

            foreach (var scheduleType in deserializedObject)
            {
                scheduleTypes.Add(scheduleType.ScheduleTypeID, $"{scheduleType.Value}");
            }
            return scheduleTypes;
        }

        private async Task<Dictionary<int, string>> GetCostCenterList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<CostCenter>>(responseString);

            var costCenters = new Dictionary<int, string>();

            foreach (var costCenter in deserializedObject)
            {
                costCenters.Add(costCenter.Id, $"{costCenter.Value} ({costCenter.Description})");
            }
            return costCenters;
        }

        private async Task<Dictionary<int, string>> GetDirectorList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<User>>(responseString);

            var directors = new Dictionary<int, string>();

            foreach (var director in deserializedObject)
            {
                for (var i = 0; i < director.Roles.Count; ++i)
                {
                    if (director.Roles[i].Value == "DIRECTOR")
                    {
                        directors.Add(director.UserID, $"{director.FirstName} {director.LastName}");

                    }

                }

            }
            return directors;
        }

        private async Task<Dictionary<int, string>> GetOwnerList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<User>>(responseString);

            var owners = new Dictionary<int, string>();


            foreach (var owner in deserializedObject)
            {
                for (var i = 0; i < owner.Roles.Count; ++i) 
                {
                    if (owner.Roles[i].Value == "OWNER")
                    {
                        owners.Add(owner.UserID, $"{owner.FirstName} {owner.LastName}");

                    }

                } 

            }
            return owners;
        }

        private async Task<Dictionary<int, string>> GetStatusList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<StatusList>>(responseString);

            var statuses = new Dictionary<int, string>();

            foreach (var status in deserializedObject)
            {
                statuses.Add(status.Id, $"{status.Status}");
            }
            return statuses;
        }

        private async Task<Dictionary<int, string>> GetSiteList(string uri)
        {
            var response = await _httpClientSvc.Client.GetAsync(uri);

            if (!response.IsSuccessStatusCode) return null;

            var responseString = response.Content.ReadAsStringAsync().Result;

            var deserializedObject = JsonConvert.DeserializeObject<List<Site>>(responseString);

            var sites = new Dictionary<int, string>();

            foreach (var site in deserializedObject)
            {
                sites.Add(site.SiteID, $"{site.Code}");
            }
            return sites;
        }


        // PUT: api/v1/ar/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAr(int id, Ar ar)
        {
            if (id != ar.ArID)
            {
                return BadRequest();
            }

            _context.Entry(ar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArExists(id))
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

        // POST: api/v1/ar
        [HttpPost]
        public async Task<ActionResult<Ar>> PostAr(Ar ar)
        {
            _context.Ar.Add(ar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAr", new { id = ar.ArID }, ar);
        }

        // DELETE: api/v1/ar/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ar>> DeleteAr(int id)
        {
            var ar = await _context.Ar.FindAsync(id);
            if (ar == null)
            {
                return NotFound();
            }

            _context.Ar.Remove(ar);
            await _context.SaveChangesAsync();

            return ar;
        }

        private bool ArExists(int id)
        {
            return _context.Ar.Any(e => e.ArID == id);
        }
    }
}