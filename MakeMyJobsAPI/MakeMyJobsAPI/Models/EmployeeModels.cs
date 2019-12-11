using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Models
{
    public class EmployeeInfoModel
    {
        public int employeeId { get; set; }
        public int userId { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String city { get; set; }
        public String contactNumber { get; set; }
        public DateTime? dateOfBirth { get; set; }
        public DateTime dateJoined { get; set; }
        public String resume { get; set; }
        public String address { get; set; }
        public int state { get; set; }
        public int country { get; set; }
        public String zipCode { get; set; }
        public String email { get; set; }
        public int isActive { get; set; }
        public List<EmployeeEducationModel> employeeEducation { get; set; }
        public List<EmployeeExperienceModel> employeeExperience { get; set; }
    }

    public class EmployeeEducationModel
    {
        public int empEducationId { get; set; }
        public int employeeId { get; set; }
        public string instituteName { get; set; }
        public int instituteType { get; set; }
        public decimal percentage { get; set; }
        public DateTime joinedOn { get; set; }
        public DateTime passedOn { get; set; }
        public int isActive { get; set; }
    }
    public class EmployeeExperienceModel
    {
        public int empExperienceId { get; set; }
        public int employeeId { get; set; }
        public string companyName { get; set; }
        public string position { get; set; }
        public DateTime joinedOn { get; set; }
        public DateTime? leftOn { get; set; }
        public int isActive { get; set; }
    }
}