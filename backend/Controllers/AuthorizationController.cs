using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
namespace FloraProjekat.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class AuthorizationController : ControllerBase
  {
    
    public FloraContext Context { get; set; }
    public AuthorizationController(FloraContext context)
    {
      Context = context;
    }

    [Authorize(Role.User)]
    [HttpGet("AuthorizeUser")]
    public async Task<ActionResult> AuthorizeUser()
    {
      try
      {
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }

    [Authorize(Role.Admin)]
    [HttpGet("AuthorizeAdmin")]
    public async Task<ActionResult> AuthorizeAdmin()
    {
      try
      {
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }
  }
}