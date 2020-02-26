using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PurchaseRequisitionsMock.Data.Model
{
    public class Pr
    {
        public int ID { get; set; }
        public int ArNumber { get; set; }
        public int OwnerID { get; set; }
        public string Description { get; set; }
        public string PrNumber { get; set; }
        public double Amount { get; set; }
    }
}