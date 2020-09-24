using Microsoft.EntityFrameworkCore.Migrations;

namespace BikeRental.Dal.Migrations
{
    public partial class AddPhotoFieldToBike : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Bikes",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JwoToken",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Bikes");

            migrationBuilder.DropColumn(
                name: "JwoToken",
                table: "AspNetUsers");
        }
    }
}
