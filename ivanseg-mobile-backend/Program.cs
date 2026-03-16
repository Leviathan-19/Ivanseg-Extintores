using DotNetEnv;
using ivanseg_mobile_backend.Data;
using Microsoft.EntityFrameworkCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    try
    {
        db.Database.OpenConnection();
        Console.WriteLine("Conectado a la base de datos");
        db.Database.CloseConnection();
    }
    catch (Exception ex)
    {
        Console.WriteLine("No se pudo conectar a la base de datos");
        Console.WriteLine(ex.Message);
    }
}

app.MapControllers();

app.Run();
