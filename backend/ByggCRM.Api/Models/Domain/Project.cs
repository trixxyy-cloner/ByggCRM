using System.Reflection.Metadata;

namespace ByggCRM.Api.Models.Domain;

public class Project
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Client { get; set; }
    public string Address { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Budget { get; set; }
    public string Status { get; set; } // Planning, ongoing, completed
    public int Progress { get; set; }
    public List<String> Team { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Foregin key
    public string UserId { get; set; }
    public User User { get; set; }
}
