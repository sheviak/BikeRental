using Microsoft.EntityFrameworkCore.Migrations;

namespace BikeRental.Dal.Migrations
{
    public partial class InsertBikeTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO BikeTypes (Name) VALUES ('Highway');");
            migrationBuilder.Sql("INSERT INTO BikeTypes (Name) VALUES ('Mountain');");            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM BikeTypes;");
        }
    }
}