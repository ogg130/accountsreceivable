using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AccountsReceivable.Data.Model
{
    public class Ar :TimeStampable
    {
        public int ArID { get; set; }
        public string ArNumber { get; set; }
        public int CostCenter { get; set; }
        public string ProjectName { get; set; }
        public int DirectorID { get; set; }
        public decimal ActualPercent { get; set; }
        public int OwnerID { get; set; }
        public decimal Amount { get; set; }
        public decimal Committed { get; set; }
        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }
        public string Purpose { get; set; }
        public string Benefits { get; set; }
        public string Risks { get; set; }
        public string Comments { get; set; }
        public bool ChangesQueued { get; set; }
        //public DateTime EnteredDate { get; set; }
        //public int EnteredByID { get; set; }
        public int SiteID { get; set; }
        public int Status { get; set; }
        public int Asset { get; set; }
        public int Type { get; set; }
    }
    public class ArDto
    {
        public int ArID { get; set; }
        public string ArNumber { get; set; }
        public string CostCenter { get; set; }
        public string ProjectName { get; set; }
        public string Director { get; set; }
        public decimal ActualPercent { get; set; }
        public string Owner { get; set; }
        public decimal Amount { get; set; }
        public decimal Committed { get; set; }


        public string EndDate { get; set; }
   

        public string StartDate { get; set; }
        public string Purpose { get; set; }
        public string Benefits { get; set; }
        public string Risks { get; set; }
        public string Comments { get; set; }
        public string Site { get; set; } 
        public string Status { get; set; }
        public string Asset { get; set; }
        public string Type { get; set; }


        public string EnteredDate { get; set; }
    }
}
