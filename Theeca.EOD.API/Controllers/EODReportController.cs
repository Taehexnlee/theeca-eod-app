using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Theeca.EOD.API.Data;
using Theeca.EOD.API.Models;

namespace Theeca.EOD.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EODReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EODReportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<EODReport>>> GetAll()
        {
            var reports = await _context.EodReports.ToListAsync();
            return Ok(reports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EODReport>> GetById(int id)
        {
            var report = await _context.EodReports.FindAsync(id);
            if (report == null)
                return NotFound();
            return Ok(report);
        }

        [HttpPost]
        public async Task<ActionResult<EODReport>> Create(EODReport report)
        {
            _context.EodReports.Add(report);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = report.Id }, report);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EODReport updatedReport)
        {
            var report = await _context.EodReports.FindAsync(id);
            if (report == null)
                return NotFound();

            report.Shift = updatedReport.Shift;
            report.CashSales = updatedReport.CashSales;
            report.GrossSales = updatedReport.GrossSales;
            report.NetSales = updatedReport.NetSales;
            report.Tips = updatedReport.Tips;
            report.Refund = updatedReport.Refund;
            report.RefundComment = updatedReport.RefundComment;
            report.Rating = updatedReport.Rating;
            report.Name = updatedReport.Name;
            report.TotalCash = updatedReport.TotalCash;
            report.TotalToBank = updatedReport.TotalToBank;
            report.Variance = updatedReport.Variance;
            report.Date = updatedReport.Date;
            report.Time = updatedReport.Time;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var report = await _context.EodReports.FindAsync(id);
            if (report == null)
                return NotFound();

            _context.EodReports.Remove(report);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        
    }
}