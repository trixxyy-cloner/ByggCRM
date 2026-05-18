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
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetProjects()
        {
            var userId = GetUserId();
            var projects = await _projectService.GetProjectsAsync(userId);
            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(string id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            
            if (project == null)
                return NotFound();

            return Ok(project);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectDto projectDto)
        {
            var userId = GetUserId();
            var createdProject = await _projectService.CreateProjectAsync(userId, projectDto);
            
            return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProjectDto>> UpdateProject(string id, ProjectDto projectDto)
        {
            var updatedProject = await _projectService.UpdateProjectAsync(id, projectDto);
            
            if (updatedProject == null)
                return NotFound();

            return Ok(updatedProject);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(string id)
        {
            var result = await _projectService.DeleteProjectAsync(id);
            
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}