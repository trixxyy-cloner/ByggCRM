using ByggCRM.Api.Models.Dtos;
using ByggCRM.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ByggCRM.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpGet]
        public async Task<ActionResult<List<CustomerDto>>> GetCustomers()
        {
            var userId = GetUserId();
            var customers = await _customerService.GetCustomersAsync(userId);
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDto>> GetCustomer(string id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);
            
            if (customer == null)
                return NotFound();

            return Ok(customer);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDto>> CreateCustomer(CustomerDto customerDto)
        {
            var userId = GetUserId();
            var createdCustomer = await _customerService.CreateCustomerAsync(userId, customerDto);
            
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.Id }, createdCustomer);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerDto>> UpdateCustomer(string id, CustomerDto customerDto)
        {
            var updatedCustomer = await _customerService.UpdateCustomerAsync(id, customerDto);
            
            if (updatedCustomer == null)
                return NotFound();

            return Ok(updatedCustomer);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(string id)
        {
            var result = await _customerService.DeleteCustomerAsync(id);
            
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}