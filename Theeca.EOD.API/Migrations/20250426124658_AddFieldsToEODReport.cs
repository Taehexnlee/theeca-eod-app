using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Theeca.EOD.API.Migrations
{
    /// <inheritdoc />
    public partial class AddFieldsToEODReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "EodReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "EodReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalCash",
                table: "EodReports",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalToBank",
                table: "EodReports",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Variance",
                table: "EodReports",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "EodReports");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "EodReports");

            migrationBuilder.DropColumn(
                name: "TotalCash",
                table: "EodReports");

            migrationBuilder.DropColumn(
                name: "TotalToBank",
                table: "EodReports");

            migrationBuilder.DropColumn(
                name: "Variance",
                table: "EodReports");
        }
    }
}
