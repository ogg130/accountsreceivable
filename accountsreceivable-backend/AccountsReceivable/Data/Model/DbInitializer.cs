using System;
using System.Collections.Generic;
using System.Linq;

namespace AccountsReceivable.Data.Model
{
    public static class DbInitializer
    {
        public static void Initialize(Context context)
        {
            context.Database.EnsureCreated();

            if (context.Ar.Any())
            {
                return;   // DB has been seeded
            }

            var ars = new List<Ar>
            {
                new Ar{Asset=1, Type=1, ArNumber="1234567", CostCenter=1, SiteID=1, Status=3, Benefits="Insert benefits 1 here", Risks="Insert risks 1 here", Purpose="Insert purpose 1 here", Comments="Marty McFly didnt show up on time. Waiting for status update.", ProjectName="Flux capacitor replacement", DirectorID=8, OwnerID=1, Amount=1000000.00m, Committed=300000.00m,   ActualPercent=0.95m, EndDate=new DateTime(2020, 12, 30), StartDate=new DateTime(2018, 11, 30), EnteredDate=DateTime.Now,EnteredByID=1},
                new Ar{Asset=2, Type=2, ArNumber="2345678",CostCenter=2, SiteID=2, Status=4, Benefits="Insert benefits 2 here", Risks="Insert risks 2 here", Purpose="Insert purpose 2 here", Comments="Tried to find the bucket of dialtone but could not locate it.", ProjectName="Replenish bucket of dialtone", DirectorID=7, OwnerID=9, Amount=2000.00m, Committed=200.00m, ActualPercent=0.15m,EndDate=new DateTime(2020, 02, 15), StartDate=new DateTime(2019, 06, 15), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar{Asset=3, Type=1, ArNumber="3456789",CostCenter=3, SiteID=3, Status=7, Benefits="Insert benefits 3 here",Risks="Insert risks 3 here", Purpose="Insert purpose 3 here", Comments="Insert Comments 1 here", ProjectName="Polish the cable stretcher", DirectorID=6, OwnerID=10, Amount=4000.00m, Committed=400.00m,  ActualPercent=67,EndDate=new DateTime(2020, 03, 10), StartDate=new DateTime(2017, 04, 09), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar{Asset=4, Type=2, ArNumber="6789012", CostCenter=1, SiteID=1, Status=5, Benefits="Insert benefits 4 here",Risks="Insert risks 4 here", Purpose="Insert purpose 4 here", Comments="Insert Comments 2 here", ProjectName="Splice the jetline", DirectorID=8, OwnerID=11, Amount=10000.00m, Committed=1000.00m,   ActualPercent=0.98m, EndDate=new DateTime(2020, 02, 28), StartDate=new DateTime(2020, 01, 15), EnteredDate=DateTime.Now,EnteredByID=1},
                new Ar{Asset=5, Type=6, ArNumber="4567890",CostCenter=2, SiteID=2, Status=4, Benefits="Insert benefits 5 here",Risks="Insert risks 5 here", Purpose="Insert purpose 5 here", Comments="Insert Comments 3 here", ProjectName="Building Uplift Phase 1", DirectorID=7, OwnerID=12, Amount=2345669.42m, Committed=1000310.10m, ActualPercent=0.75m,EndDate=new DateTime(2020, 03, 12), StartDate=new DateTime(2016, 02, 29), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar{Asset=5, Type=3, ArNumber="5678901",CostCenter=3, SiteID=3, Status=3, Benefits="Insert benefits 6 here",Risks="Insert risks 6 here", Purpose="Insert purpose 6 here", Comments="Insert Comments 4 here", ProjectName="Replace light bulbs", DirectorID=6, OwnerID=13, Amount=503033.49m, Committed=72840.10m, ActualPercent=20,EndDate=new DateTime(2021, 08, 20), StartDate=new DateTime(2019, 12, 12), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar{Asset=6, Type=1, CostCenter=4, SiteID=1, Status=1, Benefits="Insert benefits 7 here",Risks="Insert risks 7 here", Comments="Insert Comments 5 here", Purpose="Insert purpose 7 here", ProjectName="Generator Upflit", DirectorID=8, OwnerID=1, Amount=325274.91m, Committed=5310.10m,   ActualPercent=0.07m,EndDate=new DateTime(2020, 7, 25), StartDate=new DateTime(2017, 06, 18), EnteredDate=DateTime.Now,EnteredByID=1},
                new Ar{Asset=7, Type=1, CostCenter=2, SiteID=2, Status=2, Benefits="Insert benefits 8 here",Risks="Insert risks 8 here",  Comments="Insert Comments 6 here", Purpose="Insert purpose 8 here", ProjectName="Landscaping Uplift", DirectorID=7, OwnerID=11, Amount=45669.42m, Committed=310.10m, ActualPercent=0.15m, EndDate=new DateTime(2025, 12, 15), StartDate=new DateTime(2021, 06, 15), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar{Asset=3, Type=2, CostCenter=3, SiteID=3, Status=1, Benefits="Insert benefits 9 here",Risks="Insert risks 9 here",  Comments="Insert Comments 7 here", Purpose="Insert purpose 9 here", ProjectName="Feed the electricians", DirectorID=6, OwnerID=11, Amount=102498.55m, Committed=0.00m,  ActualPercent=.30m, EndDate=new DateTime(2021, 04, 11), StartDate=new DateTime(2019, 11, 10), EnteredDate=DateTime.Now,EnteredByID=1 },
                new Ar { Asset = 6, Type = 1, CostCenter = 4, SiteID = 1, Status = 1, Benefits = "Insert benefits 7 here", Risks = "Insert risks 7 here", Comments = "Insert Comments 5 here", Purpose = "Insert purpose 7 here", ProjectName = "Generator Upflit", DirectorID = 8, OwnerID = 1, Amount = 325274.91m, Committed = 5310.10m, ActualPercent = 0.07m, EndDate = new DateTime(2020, 7, 25), StartDate = new DateTime(2017, 06, 18), EnteredDate = DateTime.Now, EnteredByID = 1 },
                new Ar { Asset = 7, Type = 1, CostCenter = 2, SiteID = 2, Status = 2, Benefits = "Insert benefits 8 here", Risks = "Insert risks 8 here", Comments = "Insert Comments 6 here", Purpose = "Insert purpose 8 here", ProjectName = "Landscaping Uplift", DirectorID = 7, OwnerID = 1, Amount = 45669.42m, Committed = 310.10m, ActualPercent = 0.15m, EndDate = new DateTime(2025, 12, 15), StartDate = new DateTime(2021, 06, 15), EnteredDate = DateTime.Now, EnteredByID = 1 },
                new Ar { Asset = 3, Type = 2, CostCenter = 3, SiteID = 3, Status = 1, Benefits = "Insert benefits 9 here", Risks = "Insert risks 9 here", Comments = "Insert Comments 7 here", Purpose = "Insert purpose 9 here", ProjectName = "Feed the electricians", DirectorID = 6, OwnerID = 1, Amount = 102498.55m, Committed = 0.00m, ActualPercent = .30m, EndDate = new DateTime(2021, 04, 11), StartDate = new DateTime(2019, 11, 10), EnteredDate = DateTime.Now, EnteredByID = 1 }
            };

            for (var i = 0; i < ars.Count; ++i)
            {
                context.Ar.Add(ars[i]);

            }
            context.SaveChanges();

            var scheduleAssets = new List<ScheduleAsset>
            {
                new ScheduleAsset{Value="Land", EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Buildings",EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Leasehold Improvements",EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Computer / Networking Equipment", EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Office / Communication Equipment", EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Furniture and Fixtures", EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleAsset{Value="Transportation Equipment", EnteredDate=DateTime.Now,EnteredByID=1},
            };

            for (var i = 0; i < scheduleAssets.Count; ++i)
            {
                context.ScheduleAsset.Add(scheduleAssets[i]);
            }
            context.SaveChanges();

            var scheduleTypes = new List<ScheduleType>
            {
                new ScheduleType{Value="Land", ScheduleAssetID=1, Term=10, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Buildings", ScheduleAssetID=2, Term=10, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Building Improvements", Term=-1, ScheduleAssetID=2, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Normal", ScheduleAssetID=3, Term=-1, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Structural", ScheduleAssetID=3,  Term=10, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Personal Computers", ScheduleAssetID=4, Term=3, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Network Equipment / Hardware / Cabling / Servers", Term=5, ScheduleAssetID=4, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Telecommunications Equipment / Cabling", ScheduleAssetID=5, Term=5,EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="CCTV Cameras / TVs / DVDs", ScheduleAssetID=5, Term=3,EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Security Equipment", ScheduleAssetID=5, Term=3,EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Refrigerators", ScheduleAssetID=5, Term=3,EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Light Boxes / Signages installed at premises", ScheduleAssetID=5, Term=3, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Other Capitalized Equipment", ScheduleAssetID=5,Term=3, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Furniture and Fixtures", ScheduleAssetID=6,Term=8, EnteredDate=DateTime.Now,EnteredByID=1},
                new ScheduleType{Value="Motor Vehicles", ScheduleAssetID=7, Term=3,EnteredDate=DateTime.Now,EnteredByID=1},
            };

            for (var i = 0; i < scheduleTypes.Count; ++i)
            {
                context.ScheduleType.Add(scheduleTypes[i]);
            }
            context.SaveChanges();

        }
    }
}