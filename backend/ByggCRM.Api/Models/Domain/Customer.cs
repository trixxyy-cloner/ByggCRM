namespace ByggCRM.Api.Models.Domain
{
    public class Customer
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int Projects { get; set; }
        public decimal TotalSpent { get; set; }
        public DateTime JoinDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key
        public string UserId { get; set; }
        public User User { get; set; }
    }
}
