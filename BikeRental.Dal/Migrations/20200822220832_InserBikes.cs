using Microsoft.EntityFrameworkCore.Migrations;

namespace BikeRental.Dal.Migrations
{
    public partial class InserBikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Bikes (Name, Status, Price, BikeTypeId) VALUES ('Superfast bicycle', 0, 12.99, 1);");
            migrationBuilder.Sql("INSERT INTO Bikes (Name, Status, Price, BikeTypeId) VALUES ('Superfast bicycle 2.0', 1, 15.99, 2);");
            migrationBuilder.Sql("INSERT INTO Bikes (Name, Status, Price, BikeTypeId) VALUES ('Roadster', 0, 20.99, 2);");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Bikes;");
        }
    }
}
