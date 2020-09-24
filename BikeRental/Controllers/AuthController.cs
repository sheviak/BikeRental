using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using BikeRental.ViewModels.Auth;
using BikeRental.Core;
using BikeRental.Core.Options;

namespace BikeRental.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IOptions<AuthOptions> authOptions;
        private readonly IMapper mapper;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            IOptions<AuthOptions> authOptions,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.authOptions = authOptions;
            this.mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByEmailAsync(model.Email);
                var result = await userManager.CheckPasswordAsync(user, model.Password);

                if (user != null && result)
                {
                    var token = this.GenerateJwtToken(user);
                    return Ok(new { access_token = token });
                }
                else
                {
                    return Unauthorized(new { message = "Login or password is incorrect" });
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var checkExistUser = await this.userManager.FindByEmailAsync(model.Email);

                if (checkExistUser != null)
                {
                    ModelState.AddModelError(nameof(model.Email), "This email is busy!");
                    return BadRequest(ModelState);
                }

                var user = this.mapper.Map<ApplicationUser>(model);
                var result = await this.userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var token = this.GenerateJwtToken(user);
                    return Ok(new { access_token = token });
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }

            return BadRequest(ModelState);
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var authParams = this.authOptions.Value;
            var credentials = new SigningCredentials(authParams.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var date = DateTime.Now;

            var token = new JwtSecurityToken
            (
                issuer: authParams.Issuer,
                audience: authParams.Audience,
                claims: claims,
                expires: date.AddSeconds(authParams.TokenLifeTime),
                notBefore: date,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}