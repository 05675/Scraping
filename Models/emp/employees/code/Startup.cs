using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Pomelo.EntityFrameworkCore.MySql.Storage;
using Yayoi.Employees.Models;

namespace Yayoi.Employees
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            DotNetEnv.Env.Load();
            var connectionString = System.Environment.GetEnvironmentVariable("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString))
                // .envにMySQLへの接続文字列が定義されていない場合、例外を投げて処理を中断します。
                throw new Exception("Add connection string to \".env\"");
            services.AddDbContext<EmployeeContext>(options => options.UseMySql(connectionString));

            // Add OpenAPI document
            services.AddOpenApiDocument(document =>
            {
                document.PostProcess = doc =>
                {
                    doc.Info.Version = "v1";
                    doc.Info.Title = "従業員";
                    doc.Info.Description = "従業員サービス";
                    doc.Info.TermsOfService = "None";
                    doc.Info.Contact = new NSwag.OpenApiContact
                    {
                        Name = "弥生株式会社",
                        Email = string.Empty,
                        Url = "https://www.yayoi-kk.co.jp/"
                    };
                    doc.Info.License = new NSwag.OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = "https://example.com/license"
                    };
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // Add OpenAPI/Swagger middlewares
            app.UseOpenApi();   // Serves the registered OpenAPI/Swagger documents by default on `/swagger/{documentName}/swagger.json`
            app.UseSwaggerUi3();    // Serves the Swagger UI 3 web ui to view the OpenAPI/Swagger documents by default on `/swagger`
        }
    }
}
