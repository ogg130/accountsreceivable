using System;
using System.Collections.Generic;
using System.Linq;

namespace Statuses.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            if (context.StatusHistory.Any())
            {
                return;   // DB has been seeded
            }

            var statusLevels = new List<StatusLevel>
            {
                new StatusLevel{Status="Create New AR", Description="Newly created AR", ApplicationID=1, EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="AR Pending", Description="Ar Pending Finance Approval", ApplicationID=1,  EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="AR Approved", Description="Approved AR", ApplicationID=1,  EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="Baseline", Description="Baseline", ApplicationID=1,  EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="Purchasing", Description="Purchasing", ApplicationID=1,  EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="Closeout", Description="AR in closeout process",  ApplicationID=1, EnteredDate=DateTime.Now, EnteredByID=1},
                new StatusLevel{Status="Close", Description="AR Closed/Completed",  ApplicationID=1, EnteredDate=DateTime.Now, EnteredByID=1}
            };

            foreach (var statusLevel in statusLevels)
            {
                context.StatusLevel.Add(statusLevel);
                context.SaveChanges();
            }

            var statusHistory = new List<StatusHistory>
            {
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=1, EnteredDate=DateTime.Now.AddDays(-10),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=2, EnteredDate=DateTime.Now.AddDays(-9),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=3, EnteredDate=DateTime.Now.AddDays(-8),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=4, EnteredDate=DateTime.Now.AddDays(-7),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=5, EnteredDate=DateTime.Now.AddDays(-6),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=1, EnteredDate=DateTime.Now.AddDays(-1),EnteredByID=1},
                new StatusHistory{EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=2, EnteredDate=DateTime.Now,EnteredByID=1},
                new StatusHistory{ EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=1, EnteredDate=DateTime.Now.AddDays(-5),EnteredByID=1},
                new StatusHistory{ EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=2, EnteredDate=DateTime.Now.AddDays(-3),EnteredByID=1},
                new StatusHistory{ EndDate=DateTime.Now.Date, StartDate=DateTime.Now.Date, StatusLevelID=3, EnteredDate=DateTime.Now.AddDays(-1),EnteredByID=1},
            };
            foreach (var status in statusHistory)
            {
                context.StatusHistory.Add(status);
                context.SaveChanges();
            }
        }
    }
}