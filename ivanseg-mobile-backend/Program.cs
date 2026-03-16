using DotNetEnv;
using ivanseg_mobile_backend.Data;
using Microsoft.EntityFrameworkCore;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions =>
        {
            npgsqlOptions.CommandTimeout(10);
        }
    )
);
builder
    .Services.AddHealthChecks()
    .AddNpgSql(builder.Configuration.GetConnectionString("DefaultConnection")!);

builder.Services.AddControllers();

var app = builder.Build();

//------------------------------------Test de conexión a la base de datos------------------------------------
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

//     try
//     {
//         Console.WriteLine(" Probando conexión a la base de datos...");

//         var conn = db.Database.GetDbConnection();
//         await conn.OpenAsync();

//         Console.WriteLine(" Conectado a la base de datos");
//         Console.WriteLine($"Servidor: {conn.DataSource}");
//         Console.WriteLine($"DB: {conn.Database}");

//         var command = conn.CreateCommand();
//         command.CommandText = "SELECT * FROM visitas LIMIT 1";

//         var reader = await command.ExecuteReaderAsync();

//         if (await reader.ReadAsync())
//         {
//             Console.WriteLine(" Registro encontrado en la tabla visitas:");

//             for (int i = 0; i < reader.FieldCount; i++)
//             {
//                 Console.WriteLine($"{reader.GetName(i)}: {reader.GetValue(i)}");
//             }
//         }
//         else
//         {
//             Console.WriteLine(" La tabla visitas existe pero no tiene registros.");
//         }

//         await conn.CloseAsync();
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine(" Error al consultar la tabla:");
//         Console.WriteLine(ex.Message);
//     }
// }

//------------------------------------------------------------------------------------------------------------
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

app.MapControllers();

app.Run();
