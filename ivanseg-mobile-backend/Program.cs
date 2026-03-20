using DotNetEnv;
using ivanseg_mobile_backend.Data;
using ivanseg_mobile_backend.Services;
using Microsoft.EntityFrameworkCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

//------------------ DB ------------------

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions =>
        {
            npgsqlOptions.CommandTimeout(10);
        }
    )
);

//------------------ HealthChecks ------------------

builder
    .Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

//------------------ Controllers ------------------

builder
    .Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = System
            .Text
            .Json
            .Serialization
            .ReferenceHandler
            .IgnoreCycles
    );

//------------------ Services ------------------

builder.Services.AddScoped<VisitaService>();
builder.Services.AddScoped<UbicacionService>();

//------------------ Build ------------------

var app = builder.Build();

//------------------ Endpoint health ------------------

app.MapGet(
    "/health",
    async (AppDbContext db) =>
    {
        try
        {
            await db.Database.ExecuteSqlRawAsync("SELECT 1");

            return Results.Ok(new { api = "running", database = "connected" });
        }
        catch
        {
            return Results.StatusCode(500);
        }
    }
);

//------------------ Controllers ------------------

app.MapControllers();

app.Run();
