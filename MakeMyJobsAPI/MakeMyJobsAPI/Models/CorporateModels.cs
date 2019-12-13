﻿using System;
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
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public Nullable<int> IsActive { get; set; }
        public DateTime expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime LastUpdatedOn { get; set; }
        public string locationNames { get; set; }
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
        public DateTime startDate { get; set; }
        public DateTime expiryDate { get; set; }
        public DateTime postedOn { get; set; }
        public DateTime lastUpdatedOn { get; set; }
        public int minStipend { get; set; }
        public int? maxStipend { get; set; }
        public int? postsAvailable { get; set; }
        public int isWFHAvailable { get; set; }
        public int isPartTimeAvailable { get; set; }
        public int jobOffer { get; set; }
        public List<DropdownModel> locations { get; set; }
        public String questionOne { get; set; }
        public String questionTwo { get; set; }
        public String questionThree { get; set; }
        public int isActicve { get; set; }
        public string locationNames { get; set; }
    }
}