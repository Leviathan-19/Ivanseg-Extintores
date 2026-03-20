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
            modelBuilder.Entity<Provincia>(entity =>
            {
                entity.ToTable("provincias");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
            });

            modelBuilder.Entity<Canton>(entity =>
            {
                entity.ToTable("cantones");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.ProvinciaId).HasColumnName("provincia_id");
            });

            modelBuilder.Entity<Parroquia>(entity =>
            {
                entity.ToTable("parroquias");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.CantonId).HasColumnName("canton_id");
            });

            modelBuilder.Entity<Barrio>(entity =>
            {
                entity.ToTable("barrios");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.ParroquiaId).HasColumnName("parroquia_id");
            });

            modelBuilder.Entity<Visita>(entity =>
            {
                entity.ToTable("visitas");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.BarrioId).HasColumnName("barrio_id");
            });
        }
    }
}
