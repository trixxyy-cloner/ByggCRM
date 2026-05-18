using Microsoft.AspNetCore.Identity;

namespace ByggCRM.Api.Models.Domain;

public class User : IdentityUser
{   
    public string FullName { get; set; }
    public DateTime CreatedAt { get; set; } =  DateTime.UtcNow;
    public List<Project> Projects { get; set; } = new();
}
