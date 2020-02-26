using System;

namespace AccountsReceivable.Data.Model
{
    public class ScheduleAsset : TimeStampable
    {
        public int ScheduleAssetID { get; set; }
        public string Value { get; set; }
    }
}

