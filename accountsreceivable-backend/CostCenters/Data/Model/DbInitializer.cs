using System;
using System.Collections.Generic;
using System.Linq;

namespace CostCenters.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            if (context.CostCenter.Any())
            {
                return;   // DB has been seeded
            }

            var costCenters = new List<CostCenter>
            {
                new CostCenter{Value=643, Description="IPC", SiteID=1, EnteredByID=1, EnteredDate=DateTime.Now },
                new CostCenter{Value=652, Description="IPC-2", SiteID=2, EnteredByID=1, EnteredDate=DateTime.Now },
                new CostCenter{Value=649, Description="TRCW", SiteID=3, EnteredByID=1, EnteredDate=DateTime.Now },
                new CostCenter{Value=999, Description="MISC", SiteID=0, EnteredByID=1, EnteredDate=DateTime.Now }
            };

            foreach (var costCenter in costCenters)
            {
                context.CostCenter.Add(costCenter);
                context.SaveChanges();
            }
        }
    }
}