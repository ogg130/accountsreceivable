using System.Collections.Generic;
using System.Linq;

namespace PurchaseRequisitionsMock.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            if (context.Pr.Any())
            {
                return;   // DB has been seeded
            }

            var prs = new List<Pr>
            {
                new Pr{ArNumber=1234567, Description="Pr 1", OwnerID = 1, PrNumber="PR1234", Amount=1000.29},
                new Pr{ArNumber=1234567, Description="Pr 2", OwnerID = 2, PrNumber="PR1235", Amount=100.29},
                new Pr{ArNumber=1234567, Description="Pr 3", OwnerID = 3, PrNumber="PR1236", Amount=1.29},
                new Pr{ArNumber=1234567, Description="Pr 4", OwnerID = 1, PrNumber="PR1237", Amount=1000.29},

                new Pr{ArNumber=2345678, Description="Pr 5", OwnerID = 2, PrNumber="PR1238", Amount=100000.29},
                new Pr{ArNumber=2345678, Description="Pr 6", OwnerID = 3, PrNumber="PR1239", Amount=100000.29},
                new Pr{ArNumber=2345678, Description="Pr 7", OwnerID = 1, PrNumber="PR1240", Amount=1.29},
                new Pr{ArNumber=2345678, Description="Pr 8", OwnerID = 2, PrNumber="PR1241", Amount=10.29},
                new Pr{ArNumber=2345678, Description="Pr 9", OwnerID = 3, PrNumber="PR1242", Amount=100.29},
                new Pr{ArNumber=2345678, Description="Pr 10", OwnerID = 1, PrNumber="PR1243", Amount=1000.30},

                new Pr{ArNumber=3456789, Description="Pr 11", OwnerID = 2,  PrNumber="PR1244", Amount=1111.57 },
                new Pr{ArNumber=3456789, Description="Pr 12", OwnerID = 3, PrNumber="PR1245", Amount=1111111.57 },
                new Pr{ArNumber=3456789, Description="Pr 13", OwnerID = 1, PrNumber="PR1246", Amount=11111.57 },

                new Pr{ArNumber=6789012, Description="Pr 14", OwnerID = 2, PrNumber="PR1247", Amount=111111.57 },
                new Pr{ArNumber=6789012, Description="Pr 15", OwnerID = 3,  PrNumber="PR1248", Amount=111111.57 },
                new Pr{ArNumber=6789012, Description="Pr 16", OwnerID = 1, PrNumber="PR1249", Amount=111.57 },

                new Pr{ArNumber=4567890, Description="Pr 17", OwnerID = 2, PrNumber="PR1250", Amount=2222.57 },
                new Pr{ArNumber=4567890, Description="Pr 18", OwnerID = 3, PrNumber="PR1251", Amount=222.57 },
                new Pr{ArNumber=4567890, Description="Pr 19", OwnerID = 1, PrNumber="PR1252", Amount=22222.57 },
                new Pr{ArNumber=4567890, Description="Pr 20", OwnerID = 2, PrNumber="PR1253", Amount=222222.57 },
                new Pr{ArNumber=4567890, Description="Pr 21", OwnerID = 3, PrNumber="PR1254", Amount=222222.57 },
                new Pr{ArNumber=4567890, Description="Pr 22", OwnerID = 1, PrNumber="PR1255", Amount=222.57 },
                new Pr{ArNumber=4567890, Description="Pr 23", OwnerID = 2,  PrNumber="PR1256", Amount=22.57 },
                new Pr{ArNumber=4567890, Description="Pr 24", OwnerID = 3, PrNumber="PR1257", Amount=2.57 },

                new Pr{ArNumber=5678901, Description="Pr 25", OwnerID = 1, PrNumber="PR1258", Amount=2.57 },
                new Pr{ArNumber=5678901, Description="Pr 26", OwnerID = 2, PrNumber="PR1259", Amount=22.57 },
                new Pr{ArNumber=5678901, Description="Pr 27", OwnerID = 3, PrNumber="PR1260", Amount=222.57 },
                new Pr{ArNumber=5678901, Description="Pr 28", OwnerID = 1, PrNumber="PR1261", Amount=222.57 },
                new Pr{ArNumber=5678901, Description="Pr 29", OwnerID = 2, PrNumber="PR1262", Amount=2222.57 },
                new Pr{ArNumber=5678901, Description="Pr 30", OwnerID = 3, PrNumber="PR1263", Amount=2222.57 },
                new Pr{ArNumber=5678901, Description="Pr 31", OwnerID = 1, PrNumber="PR1264", Amount=222.57 }
            };
            foreach (var pr in prs)
            {
                context.Pr.Add(pr);
                context.SaveChanges();
            }
            context.SaveChanges();
        }
    }
}