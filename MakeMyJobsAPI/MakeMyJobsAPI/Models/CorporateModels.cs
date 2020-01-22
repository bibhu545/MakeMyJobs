using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class CorporateInfoModel
    {
        public int corporateId { get; set; }
        public int userId { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String city { get; set; }
        public String companyInfo { get; set; }
        public String companyName { get; set; }
        public String contactNumber { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public DateTime dateJoined { get; set; }
        public String logo { get; set; }
        public String address { get; set; }
        public int state { get; set; }
        public int country { get; set; }
        public String zipCode { get; set; }
        public String email { get; set; }
        public int isActive { get; set; }
        public List<JobResponseModel> corporateJobs { get; set; }
        public List<InternshipResponseModel> corporateInternships { get; set; }
    }

    public class PostModel
    {
        public int postId { get; set; }
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int minExperience { get; set; }
        public int minSalary { get; set; }
        public int maxSalary { get; set; }
        public int postsAvailable { get; set; }
        public DateTime? expiryDate { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime? lastUpdatedOn { get; set; }
        public int postType { get; set; }
        public bool isWFHAvailable { get; set; }
        public bool isPartTimeAvailable { get; set; }
        public bool jobOffer { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public int isActicve { get; set; }
        public int totalApplications { get; set; }
        public bool applied { get; set; }
    }

    public class PostResponseModel
    {
        public int postId { get; set; }
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int minExperience { get; set; }
        public int minSalary { get; set; }
        public int? maxSalary { get; set; }
        public int? postsAvailable { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public Nullable<int> IsActive { get; set; }
        public DateTime? expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime? LastUpdatedOn { get; set; }
        public string locationNames { get; set; }
        public string tagNames { get; set; }
        public string skillNames { get; set; }
        public string companyName { get; set; }
        public string companyInfo { get; set; }
        public bool applied { get; set; }
        public String message { get; set; }
        public int totalApplications { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? lastUpdatedOn { get; set; }
        public int isWFHAvailable { get; set; }
        public int isPartTimeAvailable { get; set; }
        public int jobOffer { get; set; }
        public int isActicve { get; set; }
        public int postType { get; set; }
    }

    public class JobModel
    {
        public int jobId { get; set; }
        public int userId { get; set; }
        public string jobTitle { get; set; }
        public string description { get; set; }
        public int experience { get; set; }
        public int minSalary { get; set; }
        public int? maxSalary { get; set; }
        public int? postsAvailable { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public Nullable<int> IsActive { get; set; }
        public DateTime expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime LastUpdatedOn { get; set; }
    }

    public class JobResponseModel
    {
        public int jobId { get; set; }
        public int userId { get; set; }
        public string jobTitle { get; set; }
        public string description { get; set; }
        public int experience { get; set; }
        public int minSalary { get; set; }
        public int? maxSalary { get; set; }
        public int? postsAvailable { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public Nullable<int> IsActive { get; set; }
        public DateTime? expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime? LastUpdatedOn { get; set; }
        public string locationNames { get; set; }
        public string tagNames { get; set; }
        public string skillNames { get; set; }
        public string companyName { get; set; }
        public string companyInfo { get; set; }
        public bool applied { get; set; }
        public String message { get; set; }
        public int totalApplications { get; set; }
    }

    public class InternshipModel
    {
        public int internshipId { get; set; }
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime startDate { get; set; }
        public DateTime expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime lastUpdatedOn { get; set; }
        public int minStipend { get; set; }
        public int? maxStipend { get; set; }
        public int? postsAvailable { get; set; }
        public bool isWFHAvailable { get; set; }
        public bool isPartTimeAvailable { get; set; }
        public bool jobOffer { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public int isActicve { get; set; }
    }

    public class InternshipResponseModel
    {
        public int internshipId { get; set; }
        public int userId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime? lastUpdatedOn { get; set; }
        public int minStipend { get; set; }
        public int? maxStipend { get; set; }
        public int? postsAvailable { get; set; }
        public int isWFHAvailable { get; set; }
        public int isPartTimeAvailable { get; set; }
        public int jobOffer { get; set; }
        public List<DropdownModel> locations { get; set; }
        public List<DropdownModel> tags { get; set; }
        public List<DropdownModel> skills { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public int isActicve { get; set; }
        public string locationNames { get; set; }
        public string tagNames { get; set; }
        public string skillNames { get; set; }
        public string companyName { get; set; }
        public string companyInfo { get; set; }
        public bool applied { get; set; }
        public String message { get; set; }
        public int totalApplications { get; set; }
    }

    public class PostAnswerModel
    {
        public int postId { get; set; }
        public int userId { get; set; }
        public String answerOne { get; set; }
        public String answerTwo { get; set; }
        public String answerThree { get; set; }
    }
    public class InternshipAnswerModel
    {
        public int internshipId { get; set; }
        public int userId { get; set; }
        public String answerOne { get; set; }
        public String answerTwo { get; set; }
        public String answerThree { get; set; }
    }
    public class PostApplicationResponse
    {
        public PostResponseModel postDetails { get; set; }
        public String answerOne { get; set; }
        public String answerTwo { get; set; }
        public String answerThree { get; set; }
        public DateTime applyDate { get; set; }
    }
    public class JobApplicationResponse
    {
        public JobResponseModel jobDetails { get; set; }
        public String answerOne { get; set; }
        public String answerTwo { get; set; }
        public String answerThree { get; set; }
        public DateTime applyDate { get; set; }
    }
    public class StudentPostApplicationModel
    {
        public StudentInfoModel studentInfo { get; set; }
        public PostApplicationModel applicationInfo { get; set; }
    }
    public class EmployeePostApplicationModel
    {
        public EmployeeInfoModel employeeInfo { get; set; }
        public PostApplicationModel applicationInfo { get; set; }
    }
    public class PostApplicationModel
    {
        public int postApplicationId { get; set; }
        public int userId { get; set; }
        public int postId { get; set; }
        public int status { get; set; }
        public DateTime applyDate { get; set; }
        public string message { get; set; }
    }
    public class PostFilterModel
    {
        public int userId { get; set; }
        public int postType { get; set; }
        public String searchKeyword { get; set; }
        public int tag { get; set; }
        public int city { get; set; }
        public int skill { get; set; }
        public List<int> salaryOptions { get; set; }
        public bool isWFHAvailable { get; set; }
        public bool isPartTimeAvailable { get; set; }
        public bool jobOffer { get; set; }
        public int minStipend { get; set; }
        public DateTime startDate { get; set; }
    }
}