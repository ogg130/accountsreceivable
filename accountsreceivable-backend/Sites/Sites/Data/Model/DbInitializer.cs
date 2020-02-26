using Sites.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sites.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            //Look for any users.
            if (context.Sites.Any())
            {
                return;   // DB has been seeded
            }

            var sites = new List<Site>
            {
                new Site{Name="Phoenix IPC",Code="IPC", EnteredDate=DateTime.Now,EnteredByID=1},
                new Site{Name="Greensboro IPC2", Code="IPC-2",EnteredDate=DateTime.Now,EnteredByID=1},
                new Site{Name="Phoenix TRCW", Code="TRCW",EnteredDate=DateTime.Now,EnteredByID=1},
            };
            foreach (var site in sites)
            {
                context.Sites.Add(site);
            }
            context.SaveChanges();
        }
    }
}