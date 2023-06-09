﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

#nullable disable

namespace WebTemplate.Migrations
{
    [DbContext(typeof(FloraContext))]
    [Migration("20230517121250_V3")]
    partial class V3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Models.Biljka", b =>
                {
                    b.Property<int>("BiljkaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("BiljkaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BiljkaId"));

                    b.Property<int>("Cena")
                        .HasColumnType("int")
                        .HasColumnName("CenaBiljke");

                    b.Property<int?>("CvecaraId")
                        .HasColumnType("int");

                    b.Property<string>("Deklaracija")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Deklaracija");

                    b.Property<int>("KolicinaNaStanju")
                        .HasColumnType("int")
                        .HasColumnName("KolicinaNaStanju");

                    b.Property<string>("Naziv")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NazivBiljke");

                    b.Property<string>("SlikaBiljke")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SlikaBiljke");

                    b.Property<int?>("SortaSorteId")
                        .HasColumnType("int");

                    b.HasKey("BiljkaId");

                    b.HasIndex("CvecaraId");

                    b.HasIndex("SortaSorteId");

                    b.ToTable("Biljka");
                });

            modelBuilder.Entity("Models.Cvecara", b =>
                {
                    b.Property<int>("CvecaraId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CvecaraID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CvecaraId"));

                    b.Property<string>("ImePrezimeVlasnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ImeIPrezimeVlasnika");

                    b.Property<string>("Lokacija")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("LokacijaCvecare");

                    b.Property<string>("NazivCvecare")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NazivCvecare");

                    b.HasKey("CvecaraId");

                    b.ToTable("Cvecara");
                });

            modelBuilder.Entity("Models.Grad", b =>
                {
                    b.Property<int>("IDGrada")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("GradID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IDGrada"));

                    b.Property<string>("NazivGrada")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NazivGrada");

                    b.HasKey("IDGrada");

                    b.ToTable("Grad");
                });

            modelBuilder.Entity("Models.GradCvecara", b =>
                {
                    b.Property<int>("GradCvecaraId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("GradCvecaraID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GradCvecaraId"));

                    b.Property<int?>("CvecaraId")
                        .HasColumnType("int");

                    b.Property<int?>("GradIDGrada")
                        .HasColumnType("int");

                    b.HasKey("GradCvecaraId");

                    b.HasIndex("CvecaraId");

                    b.HasIndex("GradIDGrada");

                    b.ToTable("GradCvecara");
                });

            modelBuilder.Entity("Models.Korisnik", b =>
                {
                    b.Property<int>("KorisnikId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KorisnikID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KorisnikId"));

                    b.Property<string>("AdresaKorisnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AdresaKorisnika");

                    b.Property<string>("EmailKorisnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("EmailKorisnika");

                    b.Property<string>("ImeKorisnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ImeKorisnika");

                    b.Property<string>("KorisnickoIme")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("KorisnickoIme");

                    b.Property<string>("PrezimeKorisnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("PrezimeKorisnika");

                    b.Property<string>("SifraKorisnika")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("SifraKorisnika");

                    b.Property<int>("TipKorisnika")
                        .HasColumnType("int")
                        .HasColumnName("TipKorisnika");

                    b.HasKey("KorisnikId");

                    b.ToTable("Korisnik");
                });

            modelBuilder.Entity("Models.Korpa", b =>
                {
                    b.Property<int>("KorpaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("KorpaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("KorpaId"));

                    b.Property<int?>("BiljkaId")
                        .HasColumnType("int");

                    b.Property<int>("KolicinaProizvoda")
                        .HasColumnType("int")
                        .HasColumnName("KolicinaProizvoda");

                    b.Property<int?>("KorisnikId")
                        .HasColumnType("int");

                    b.HasKey("KorpaId");

                    b.HasIndex("BiljkaId");

                    b.HasIndex("KorisnikId");

                    b.ToTable("Korpa");
                });

            modelBuilder.Entity("Models.OcenaFirme", b =>
                {
                    b.Property<int>("OcenaFirmeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OcenaFirmeID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OcenaFirmeId"));

                    b.Property<int?>("CvecaraId")
                        .HasColumnType("int");

                    b.Property<int?>("KorisnikId")
                        .HasColumnType("int");

                    b.Property<int>("Ocena")
                        .HasColumnType("int")
                        .HasColumnName("Ocena");

                    b.HasKey("OcenaFirmeId");

                    b.HasIndex("CvecaraId");

                    b.HasIndex("KorisnikId");

                    b.ToTable("OcenaFirme");
                });

            modelBuilder.Entity("Models.Porudzbina", b =>
                {
                    b.Property<int>("PorudzbinaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PorudzbinaID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PorudzbinaId"));

                    b.Property<string>("AdresaKupca")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("AdresaKupca");

                    b.Property<int>("BrojBiljaka")
                        .HasColumnType("int")
                        .HasColumnName("Kolicina");

                    b.Property<int?>("KorisnikId")
                        .HasColumnType("int");

                    b.Property<int?>("KorpaId")
                        .HasColumnType("int");

                    b.HasKey("PorudzbinaId");

                    b.HasIndex("KorisnikId");

                    b.HasIndex("KorpaId");

                    b.ToTable("Porudzbina");
                });

            modelBuilder.Entity("Models.Sorte", b =>
                {
                    b.Property<int>("SorteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("SorteID");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SorteId"));

                    b.Property<int?>("CvecaraId")
                        .HasColumnType("int");

                    b.Property<string>("NazivSorte")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NazivSorte");

                    b.HasKey("SorteId");

                    b.HasIndex("CvecaraId");

                    b.ToTable("Sorte");
                });

            modelBuilder.Entity("Models.Biljka", b =>
                {
                    b.HasOne("Models.Cvecara", "Cvecara")
                        .WithMany("Biljkee")
                        .HasForeignKey("CvecaraId");

                    b.HasOne("Models.Sorte", "Sorta")
                        .WithMany("Biljka")
                        .HasForeignKey("SortaSorteId");

                    b.Navigation("Cvecara");

                    b.Navigation("Sorta");
                });

            modelBuilder.Entity("Models.GradCvecara", b =>
                {
                    b.HasOne("Models.Cvecara", "Cvecara")
                        .WithMany("GradCvecara")
                        .HasForeignKey("CvecaraId");

                    b.HasOne("Models.Grad", "Grad")
                        .WithMany("GradCvecara")
                        .HasForeignKey("GradIDGrada");

                    b.Navigation("Cvecara");

                    b.Navigation("Grad");
                });

            modelBuilder.Entity("Models.Korpa", b =>
                {
                    b.HasOne("Models.Biljka", "Biljka")
                        .WithMany("Korpa")
                        .HasForeignKey("BiljkaId");

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikId");

                    b.Navigation("Biljka");

                    b.Navigation("Korisnik");
                });

            modelBuilder.Entity("Models.OcenaFirme", b =>
                {
                    b.HasOne("Models.Cvecara", "Cvecara")
                        .WithMany("OcenaFirme")
                        .HasForeignKey("CvecaraId");

                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany("OcenaFirme")
                        .HasForeignKey("KorisnikId");

                    b.Navigation("Cvecara");

                    b.Navigation("Korisnik");
                });

            modelBuilder.Entity("Models.Porudzbina", b =>
                {
                    b.HasOne("Models.Korisnik", "Korisnik")
                        .WithMany()
                        .HasForeignKey("KorisnikId");

                    b.HasOne("Models.Korpa", "Korpa")
                        .WithMany()
                        .HasForeignKey("KorpaId");

                    b.Navigation("Korisnik");

                    b.Navigation("Korpa");
                });

            modelBuilder.Entity("Models.Sorte", b =>
                {
                    b.HasOne("Models.Cvecara", "Cvecara")
                        .WithMany("Sorta")
                        .HasForeignKey("CvecaraId");

                    b.Navigation("Cvecara");
                });

            modelBuilder.Entity("Models.Biljka", b =>
                {
                    b.Navigation("Korpa");
                });

            modelBuilder.Entity("Models.Cvecara", b =>
                {
                    b.Navigation("Biljkee");

                    b.Navigation("GradCvecara");

                    b.Navigation("OcenaFirme");

                    b.Navigation("Sorta");
                });

            modelBuilder.Entity("Models.Grad", b =>
                {
                    b.Navigation("GradCvecara");
                });

            modelBuilder.Entity("Models.Korisnik", b =>
                {
                    b.Navigation("OcenaFirme");
                });

            modelBuilder.Entity("Models.Sorte", b =>
                {
                    b.Navigation("Biljka");
                });
#pragma warning restore 612, 618
        }
    }
}
