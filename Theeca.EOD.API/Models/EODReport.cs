using System;

namespace Theeca.EOD.API.Models
{
    public class EODReport
    {
        public int Id { get; set; }
        public string Shift { get; set; } = string.Empty;
        public decimal CashSales { get; set; }
        public decimal GrossSales { get; set; }
        public decimal NetSales { get; set; }
        public decimal Tips { get; set; }
        public decimal Refund { get; set; }
        public string RefundComment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Name { get; set; } = string.Empty;

        // 👇 여기 추가해야 작동해
        public decimal TotalCash { get; set; }
        public decimal TotalToBank { get; set; }
        public decimal Variance { get; set; }
        public string Date { get; set; } = string.Empty;
        public string Time { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}