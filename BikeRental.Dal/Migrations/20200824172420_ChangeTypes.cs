using Microsoft.EntityFrameworkCore.Migrations;

namespace BikeRental.Dal.Migrations
{
    public partial class ChangeTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Status",
                table: "Bikes",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<float>(
                name: "Price",
                table: "Bikes",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Status",
                table: "Bikes",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(byte),
                oldDefaultValue: (byte)0);

            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Bikes",
                type: "int",
                nullable: false,
                oldClrType: typeof(float));
        }
    }
}
