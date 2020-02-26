using System;

namespace Statuses.Data.Model
{
    public class StatusHistoryDto
    {
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int StatusLevelID { get; set; }
        public DateTime EnteredDate { get; set; }
        public int EnteredByID { get; set; }

        public int ArID { get; set; }
    }
}