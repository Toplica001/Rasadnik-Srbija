using Microsoft.OpenApi.Models;

public class Program
{
    private static byte[] Base64UrlDecode(string input)
    {
        while (input.Length % 4 != 0)
        {
            input += "=";
        }

        input = input.Replace('-', '+').Replace('_', '/');

        return Convert.FromBase64String(input);
    }

    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<FloraContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("FloraCS"));
        });

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CORS", policy =>
            {
                policy.AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithOrigins("http://localhost:3000");
            });
        });

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = "Flora1Tim",
                    ValidAudience = "Cvecari1sirom2zemlje",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moj1tajni2kljuc3niko4ne5znaMoj1tajni2kljuc3niko4ne5zna"))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        // Dekodiranje potpisa (signature)
                        var token = context.Request.Query["token"];
                        var parts = token.ToString().Split('.');

                        if (parts.Length == 3)
                        {
                            var header = parts[0];
                            var payload = parts[1];
                            var signature = parts[2];

                            try
                            {
                                var signatureBytes = Base64UrlDecode(signature);
                                var headerBytes = Base64UrlDecode(header);

                                // Provera validnosti potpisa
                                var signingKey = options.TokenValidationParameters.IssuerSigningKey;
                                var algorithm = SecurityAlgorithms.HmacSha256;

                                var validationParameters = new TokenValidationParameters
                                {
                                    ValidateIssuerSigningKey = true,
                                    IssuerSigningKey = signingKey,
                                    ValidateIssuer = true,
                                    ValidIssuer = "Flora1Tim",
                                    ValidateAudience = true,
                                    ValidAudience = "Cvecari1sirom2zemlje",
                                    ValidateLifetime = true,
                                    ClockSkew = TimeSpan.Zero
                                };

                                SecurityToken validatedToken;
                                var tokenHandler = new JwtSecurityTokenHandler();

                                // Postavljanje algoritma za proveru potpisa
                                validationParameters.ValidAlgorithms = new List<string> { algorithm };

                                tokenHandler.ValidateToken(token.ToString(), validationParameters, out validatedToken);
                                // Potpis je validan, možete nastaviti izvršenje

                                return Task.CompletedTask;
                            }
                            catch
                            {
                                // Handle invalid token format or decoding error
                                return Task.CompletedTask;
                            }
                        }
                        else
                        {
                            // Handle invalid token format error
                            return Task.CompletedTask;
                        }
                    },
                    OnAuthenticationFailed = context =>
                    {
                        // Handle authentication failed event
                        Console.WriteLine("Authentication failed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy(Role.Admin.ToString(), policy => policy.RequireRole(Role.Admin.ToString()));
            options.AddPolicy(Role.User.ToString(), policy => policy.RequireRole(Role.User.ToString()));
        });

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });

            // Konfiguracija zahteva slanja JWT tokena
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IJwtUtils, JwtUtils>();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("CORS");
        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }

}



// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<FloraContext>(options =>
// {
//     options.UseSqlServer(builder.Configuration.GetConnectionString("FloraCS"));
// });

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("CORS", policy =>
//     {
//         policy.AllowAnyHeader()
//               .AllowAnyMethod()
//               .WithOrigins("http://localhost:3000");
//     });
// });

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidIssuer = "Flora1Tim",
//             ValidAudience = "Cvecari1sirom2zemlje",
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moj1tajni2kljuc3niko4ne5zna"))
//         };
//     });

// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy(Role.Admin.ToString(), policy => policy.RequireRole(Role.Admin.ToString()));
//     options.AddPolicy(Role.User.ToString(), policy => policy.RequireRole(Role.User.ToString()));
// });

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddScoped<IUserService, UserService>();
// builder.Services.AddScoped<IJwtUtils, JwtUtils>();

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseCors("CORS");
// app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();

// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<FloraContext>(options =>
// {
//     options.UseSqlServer(builder.Configuration.GetConnectionString("FloraCS"));
// });

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("CORS", policy =>
//     {
//         policy.AllowAnyHeader()
//               .AllowAnyMethod()
//               .WithOrigins("http://localhost:3000");
//     });
// });

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidIssuer = "Flora1Tim",
//             ValidAudience = "Cvecari1sirom2zemlje",
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Moj1tajni2kljuc3niko4ne5zna"))
//         };
//     });

// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy(Role.Admin.ToString(), policy => policy.RequireRole(Role.Admin.ToString()));
//     options.AddPolicy(Role.User.ToString(), policy => policy.RequireRole(Role.User.ToString()));
// });

// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddScoped<IUserService, UserService>();
// builder.Services.AddScoped<IJwtUtils, JwtUtils>();

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseCors("CORS");
// app.UseHttpsRedirection();

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();


// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: "MyCorsPolicy",
//         builder =>
//         {
//             builder.WithOrigins("http://localhost:3000/")
//                 .AllowAnyHeader()
//                 .AllowAnyMethod();
//         });
// });