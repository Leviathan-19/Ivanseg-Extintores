using ivanseg_mobile_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace ivanseg_mobile_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Provincia> Provincias { get; set; }

        public DbSet<Canton> Cantones { get; set; }

        public DbSet<Parroquia> Parroquias { get; set; }

        public DbSet<Barrio> Barrios { get; set; }

        public DbSet<Visita> Visitas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Provincia>().ToTable("provincias");

            modelBuilder.Entity<Canton>().ToTable("cantones");

            modelBuilder.Entity<Parroquia>().ToTable("parroquias");

            modelBuilder.Entity<Barrio>().ToTable("barrios");

            modelBuilder.Entity<Visita>().ToTable("visitas");
        }
    }
}
