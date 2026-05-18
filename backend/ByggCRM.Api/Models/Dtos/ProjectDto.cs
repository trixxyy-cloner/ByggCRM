namespace ByggCRM.Api.Models.Dtos;

public class ProjectDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Client { get; set; }
    public string Address { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal Budget { get; set; }
    public string Status { get; set; }
    public int Progress { get; set; }
    public List<string> Team { get; set; }
}
