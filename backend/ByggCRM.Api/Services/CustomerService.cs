using ByggCRM.Api.Data;
using ByggCRM.Api.Models.Domain;
using ByggCRM.Api.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ByggCRM.Api.Services
{
    public interface ICustomerService
    {
        Task<List<CustomerDto>> GetCustomersAsync(string userId);
        Task<CustomerDto> GetCustomerByIdAsync(string customerId);
        Task<CustomerDto> CreateCustomerAsync(string userId, CustomerDto customerDto);
        Task<CustomerDto> UpdateCustomerAsync(string customerId, CustomerDto customerDto);
        Task<bool> DeleteCustomerAsync(string customerId);
    }

    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;

        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CustomerDto>> GetCustomersAsync(string userId)
        {
            var customers = await _context.Customers.ToListAsync();

            return customers.Select(c => new CustomerDto
            {
                Id = c.Id,
                Name = c.Name,
                Company = c.Company,
                Email = c.Email,
                Phone = c.Phone,
                Address = c.Address,
                Projects = c.Projects,
                TotalSpent = c.TotalSpent,
                JoinDate = c.JoinDate
            }).ToList();
        }

        public async Task<CustomerDto> GetCustomerByIdAsync(string customerId)
        {
            var customer = await _context.Customers.FindAsync(customerId);

            if (customer == null)
                return null;

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Company = customer.Company,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                Projects = customer.Projects,
                TotalSpent = customer.TotalSpent,
                JoinDate = customer.JoinDate
            };
        }

        public async Task<CustomerDto> CreateCustomerAsync(string userId, CustomerDto customerDto)
        {
            var customer = new Customer
            {
                Name = customerDto.Name,
                Company = customerDto.Company,
                Email = customerDto.Email,
                Phone = customerDto.Phone,
                Address = customerDto.Address,
                Projects = customerDto.Projects,
                TotalSpent = customerDto.TotalSpent,
                JoinDate = customerDto.JoinDate,
                UserId = userId
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Company = customer.Company,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                Projects = customer.Projects,
                TotalSpent = customer.TotalSpent,
                JoinDate = customer.JoinDate
            };
        }

        public async Task<CustomerDto> UpdateCustomerAsync(string customerId, CustomerDto customerDto)
        {
            var customer = await _context.Customers.FindAsync(customerId);

            if (customer == null)
                return null;

            customer.Name = customerDto.Name;
            customer.Company = customerDto.Company;
            customer.Email = customerDto.Email;
            customer.Phone = customerDto.Phone;
            customer.Address = customerDto.Address;
            customer.Projects = customerDto.Projects;
            customer.TotalSpent = customerDto.TotalSpent;
            customer.JoinDate = customerDto.JoinDate;

            _context.Customers.Update(customer);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Id = customer.Id,
                Name = customer.Name,
                Company = customer.Company,
                Email = customer.Email,
                Phone = customer.Phone,
                Address = customer.Address,
                Projects = customer.Projects,
                TotalSpent = customer.TotalSpent,
                JoinDate = customer.JoinDate
            };
        }

        public async Task<bool> DeleteCustomerAsync(string customerId)
        {
            var customer = await _context.Customers.FindAsync(customerId);

            if (customer == null)
                return false;

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}