using ByggCRM.Api.Data;
using ByggCRM.Api.Models.Domain;
using ByggCRM.Api.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ByggCRM.Api.Services
{
    public interface IProjectService
    {
        Task<List<ProjectDto>> GetProjectsAsync(string userId);
        Task<ProjectDto> GetProjectByIdAsync(string projectId);
        Task<ProjectDto> CreateProjectAsync(string userId, ProjectDto projectDto);
        Task<ProjectDto> UpdateProjectAsync(string projectId, ProjectDto projectDto);
        Task<bool> DeleteProjectAsync(string projectId);
    }

    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;

        public ProjectService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectDto>> GetProjectsAsync(string userId)
        {
            var projects = await _context.Projects.ToListAsync();

            return projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Client = p.Client,
                Address = p.Address,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Budget = p.Budget,
                Status = p.Status,
                Progress = p.Progress,
                Team = p.Team
            }).ToList();
        }

        public async Task<ProjectDto> GetProjectByIdAsync(string projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
                return null;

            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Client = project.Client,
                Address = project.Address,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Budget = project.Budget,
                Status = project.Status,
                Progress = project.Progress,
                Team = project.Team
            };
        }

        public async Task<ProjectDto> CreateProjectAsync(string userId, ProjectDto projectDto)
        {
            var project = new Project
            {
                Name = projectDto.Name,
                Client = projectDto.Client,
                Address = projectDto.Address,
                StartDate = projectDto.StartDate,
                EndDate = projectDto.EndDate,
                Budget = projectDto.Budget,
                Status = projectDto.Status,
                Progress = projectDto.Progress,
                Team = projectDto.Team,
                UserId = userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Client = project.Client,
                Address = project.Address,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Budget = project.Budget,
                Status = project.Status,
                Progress = project.Progress,
                Team = project.Team
            };
        }

        public async Task<ProjectDto> UpdateProjectAsync(string projectId, ProjectDto projectDto)
        {
            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
                return null;

            project.Name = projectDto.Name;
            project.Client = projectDto.Client;
            project.Address = projectDto.Address;
            project.StartDate = projectDto.StartDate;
            project.EndDate = projectDto.EndDate;
            project.Budget = projectDto.Budget;
            project.Status = projectDto.Status;
            project.Progress = projectDto.Progress;
            project.Team = projectDto.Team;

            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Client = project.Client,
                Address = project.Address,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Budget = project.Budget,
                Status = project.Status,
                Progress = project.Progress,
                Team = project.Team
            };
        }

        public async Task<bool> DeleteProjectAsync(string projectId)
        {
            var project = await _context.Projects.FindAsync(projectId);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}