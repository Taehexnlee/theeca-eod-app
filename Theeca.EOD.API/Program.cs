using Microsoft.EntityFrameworkCore;
using Theeca.EOD.API.Data;

var builder = WebApplication.CreateBuilder(args);

// ⭐ 환경변수로 포트 받아오기
var port = Environment.GetEnvironmentVariable("PORT") ?? "80"; // 기본 80

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(int.Parse(port));
});

// CORS
var corsPolicyName = "AllowWebApp";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName, policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "https://theeca-eod-app-axcwdde0c4bpd6c7.azurewebsites.net"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// Controllers
builder.Services.AddControllers();

// SQL Server 연결
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();   // index.html을 루트로 자동 연결
app.UseStaticFiles();  

app.UseCors(corsPolicyName);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

// ⭐ 이거 추가!!!
app.MapFallbackToFile("index.html");
app.Run();
