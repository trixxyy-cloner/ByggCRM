using ByggCRM.Api.Models.Domain;
using ByggCRM.Api.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ByggCRM.Api.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
    }

    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (request.Password != request.ConfirmPassword)
            {
                return new AuthResponse { Success = false, Message = "Lösenorden matchar inte" };
            }

            var user = new User
            {
                UserName = request.Email,
                Email = request.Email,
                FullName = request.FullName
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                var errorMessages = new Dictionary<string, string>
                {
                    { "PasswordTooShort", "Lösenordet är för kort (minst 8 tecken)" },
                    { "PasswordRequiresNonAlphanumeric", "Lösenordet måste innehålla specialtecken" },
                    { "PasswordRequiresDigit", "Lösenordet måste innehålla siffror" },
                    { "PasswordRequiresUpper", "Lösenordet måste innehålla stora bokstäver" },
                    { "PasswordRequiresLower", "Lösenordet måste innehålla små bokstäver" },
                    { "DuplicateUserName", "E-postadressen är redan registrerad" }
                };

                var message = string.Join(", ", result.Errors.Select(e =>
                {
                    if (errorMessages.TryGetValue(e.Code, out var swedishMessage))
                        return swedishMessage;
                    return e.Description;
                }));

                return new AuthResponse { Success = false, Message = message };
            }

            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Användaren registrerades framgångsrikt",
                Token = token,
                User = new UserDto { Id = user.Id, Email = user.Email, FullName = user.FullName }
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return new AuthResponse { Success = false, Message = "Fel e-post eller lösenord" };
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

            if (!isPasswordValid)
            {
                return new AuthResponse { Success = false, Message = "Fel e-post eller lösenord" };
            }

            var token = GenerateJwtToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Inloggad framgångsrikt",
                Token = token,
                User = new UserDto { Id = user.Id, Email = user.Email, FullName = user.FullName }
            };
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"]);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}