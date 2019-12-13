using MakeMyJobsAPI.EDMX;
using MakeMyJobsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Business
{
    public class CorporateBusiness
    {
        public static CorporateInfoModel GetCorporateInfo(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Corporates.Any(x => x.UserId == id))
                {
                    CorporateInfoModel corporateInfoModel = context.Corporates.Join(context.States, c => c.State, st => st.StateId, (c, st) => new
                    {
                        StateName = st.StateName,
                        corporate = c
                    }).Join(context.Countries, c => c.corporate.Country, con => con.CountryId, (c, con) => new
                    {
                        corporate = c,
                        stateName = c.StateName,
                        countryName = con.CountryName
                    }).Join(context.Users, c => c.corporate.corporate.UserId, u => u.UserId, (c, u) => new CorporateInfoModel()
                    {
                        corporateId = c.corporate.corporate.CorporateId,
                        userId = c.corporate.corporate.UserId,
                        firstName = c.corporate.corporate.FirstName,
                        lastName = c.corporate.corporate.LastName,
                        city = c.corporate.corporate.City,
                        contactNumber = c.corporate.corporate.ContactNumber,
                        dateOfBirth = c.corporate.corporate.DateOfBirth,
                        logo = c.corporate.corporate.Logo,
                        dateJoined = c.corporate.corporate.DateJoined,
                        address = c.corporate.corporate.Address + (c.corporate.corporate.City == null ? "" : (", " + c.corporate.corporate.City)) + (c.corporate.corporate.State == 0 ? "" : (", " + c.corporate.StateName)) + (c.corporate.corporate.Country == 0 ? "" : (", " + c.countryName)),
                        state = c.corporate.corporate.State,
                        country = c.corporate.corporate.Country,
                        email = u.Email,
                        zipCode = c.corporate.corporate.ZipCode,
                        companyName = c.corporate.corporate.CompanyName,
                        companyInfo = c.corporate.corporate.CompanyInfo,
                        isActive = c.corporate.corporate.IsActive
                    }).FirstOrDefault(x => x.userId == id);

                    corporateInfoModel.corporateJobs = context.Jobs.Where(x => x.userId == corporateInfoModel.userId && x.IsActive == 1).Select(x => new JobResponseModel() {
                        jobId = x.JobId,
                        jobTitle = x.JobTitle,
                        description = x.Description,
                        experience = x.MinExperience,
                        IsActive = x.IsActive,
                        minSalary = x.MinSalary,
                        maxSalary = x.MaxSalary,
                        postsAvailable = x.NumberOfPosts,
                        userId = x.userId,
                        expiryDate = x.ExpiaryDate,
                        LastUpdatedOn = x.LastUpdatedOn,
                        postedOn = x.PostedOn
                    }).ToList();

                    foreach (var item in corporateInfoModel.corporateJobs)
                    {
                        item.locations = context.JobCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new {
                            cityId = jc.CityId,
                            cityName = c.CityName,
                            jobId = jc.JobId
                        }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel() {
                            value = x.cityId,
                            text = x.cityName
                        }).ToList();

                        foreach (var city in item.locations)
                        {
                            item.locationNames += city.text + ", ";
                        }
                        item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);

                        List<String> questions = context.JobQuestions.Join(context.Jobs, jq => jq.JobId, j => j.JobId, (jq, j) => new
                        {
                            jobId = j.JobId,
                            question = jq.Question
                        }).Where(x => x.jobId == item.jobId).Select(x => x.question).ToList();
                        item.questionOne = questions[0];
                        item.questionTwo = questions[1];
                        item.questionThree = questions[2];
                    }

                    corporateInfoModel.corporateInternships = context.Internships.Where(x => x.UserId == corporateInfoModel.userId && x.IsActicve == 1).Select(x => new InternshipResponseModel()
                    {
                        internshipId = x.InternshipId,
                        userId = x.UserId,
                        title = x.Title,
                        description = x.Description,
                        isActicve = x.IsActicve,
                        expiryDate = x.ExpiryDate,
                        isPartTimeAvailable = x.IsPartTimeAvailable,
                        isWFHAvailable = x.IsWFHAvailable,
                        jobOffer = x.JobOffer,
                        minStipend = x.MinStipend,
                        maxStipend = x.MaxStipend,
                        postedOn = x.PostedOn,
                        lastUpdatedOn = x.LastUpdatedOn,
                        postsAvailable = x.PostsAvailable,
                        startDate = x.StartDate
                    }).ToList();

                    foreach (var item in corporateInfoModel.corporateInternships)
                    {
                        item.locations = context.InternshipCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
                        {
                            cityId = ic.CityId,
                            cityName = c.CityName,
                            internshipId = ic.InternshipId
                        }).Where(x => x.internshipId == item.internshipId).Select(x => new DropdownModel()
                        {
                            value = x.cityId,
                            text = x.cityName
                        }).ToList();

                        foreach (var city in item.locations)
                        {
                            item.locationNames += city.text + ", ";
                        }
                        item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);

                        List<String> questions = context.InternshipQuestions.Join(context.Internships, iq => iq.InternshipId, i => i.InternshipId, (iq, i) => new
                        {
                            internshipId = i.InternshipId,
                            question = iq.Question
                        }).Where(x => x.internshipId == item.internshipId).Select(x => x.question).ToList();
                        item.questionOne = questions[0];
                        item.questionTwo = questions[1];
                        item.questionThree = questions[2];
                    }

                    return corporateInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }

        public static CorporateInfoModel GetCorporateInfoForEdit(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Corporates.Any(x => x.UserId == id))
                {
                    CorporateInfoModel corporateInfoModel = context.Corporates.Join(context.Users, c => c.UserId, u => u.UserId, (c, u) => new CorporateInfoModel()
                    {
                        corporateId = c.CorporateId,
                        userId = c.UserId,
                        firstName = c.FirstName,
                        lastName = c.LastName,
                        city = c.City,
                        contactNumber = c.ContactNumber,
                        dateOfBirth = c.DateOfBirth,
                        logo = c.Logo,
                        dateJoined = c.DateJoined,
                        address = c.Address,
                        state = c.State,
                        country = c.Country,
                        email = u.Email,
                        zipCode = c.ZipCode,
                        companyName = c.CompanyName,
                        companyInfo = c.CompanyInfo,
                        isActive = c.IsActive
                    }).FirstOrDefault(x => x.userId == id);
                    return corporateInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }

        public static CorporateInfoModel UpdateCorporateBasicInfo(CorporateInfoModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int updated = 0;
                var user = context.Users.FirstOrDefault(x => x.UserId == model.userId && x.IsActive == 1);
                var corporate = context.Corporates.FirstOrDefault(x => x.CorporateId == model.corporateId);
                if (user == null || corporate == null)
                {
                    return null;
                }
                else
                {
                    user.Email = model.email;
                    updated += context.SaveChanges();
                    corporate.FirstName = model.firstName;
                    corporate.LastName = model.lastName;
                    corporate.ContactNumber = model.contactNumber;
                    corporate.DateOfBirth = model.dateOfBirth;
                    corporate.City = model.city;
                    corporate.Address = model.address;
                    corporate.State = model.state;
                    corporate.Country = model.country;
                    corporate.ZipCode = model.zipCode;
                    corporate.CompanyName = model.companyName;
                    corporate.CompanyInfo = model.companyInfo;
                    updated += context.SaveChanges();
                }
                if (updated > 0)
                {
                    return GetUpdatedCorporateInfo(user.UserId, corporate.CorporateId);
                }
                else
                {
                    return null;
                }
            }
        }

        private static CorporateInfoModel GetUpdatedCorporateInfo(int userId, int corporateId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var user = context.Users.FirstOrDefault(x => x.UserId == userId && x.IsActive == 1);
                var corporate = context.Corporates.FirstOrDefault(x => x.CorporateId == corporateId);
                if (user == null || corporate == null)
                {
                    return null;
                }
                else
                {
                    return new CorporateInfoModel()
                    {
                        userId = userId,
                        corporateId = corporateId,
                        email = user.Email,
                        firstName = corporate.FirstName,
                        lastName = corporate.LastName,
                        contactNumber = corporate.ContactNumber,
                        city = corporate.City,
                        address = corporate.Address,
                        state = corporate.State,
                        country = corporate.Country,
                        dateOfBirth = corporate.DateOfBirth,
                        zipCode = corporate.ZipCode,
                        companyName = corporate.CompanyName,
                        companyInfo = corporate.CompanyInfo,
                        dateJoined = corporate.DateJoined,
                        logo = corporate.Logo,
                        isActive = corporate.IsActive
                    };
                }
            }
        }

        public static int CreateJob(JobModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int jobAdded = 0;
                Job job = new Job() {
                    userId = model.userId,
                    JobTitle = model.jobTitle,
                    Description = model.description,
                    IsActive = 1,
                    MaxSalary = model.maxSalary,
                    MinSalary = model.minSalary,
                    MinExperience = model.experience,
                    NumberOfPosts = model.postsAvailable,
                    PostedOn = DateTime.Now,
                    LastUpdatedOn = DateTime.Now,
                    ExpiaryDate = model.expiryDate
                };
                context.Jobs.Add(job);
                jobAdded += context.SaveChanges();
                foreach (var item in model.locations)
                {
                    context.JobCities.Add(new JobCity() {
                        JobId = job.JobId,
                        CityId = item.value
                    });
                }
                jobAdded += context.SaveChanges();
                bool hasQuestions = false;
                if(model.questionOne != "")
                {
                    context.JobQuestions.Add(new JobQuestion() {
                        IsActive = 1,
                        Question = model.questionOne,
                        JobId = job.JobId
                    });
                    hasQuestions = true;
                }
                if(model.questionTwo != "")
                {
                    context.JobQuestions.Add(new JobQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionTwo,
                        JobId = job.JobId
                    });
                    hasQuestions = true;
                }
                if(model.questionThree != "")
                {
                    context.JobQuestions.Add(new JobQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionThree,
                        JobId = job.JobId
                    });
                    hasQuestions = true;
                }
                if (hasQuestions)
                {
                    jobAdded += context.SaveChanges();
                }
                return jobAdded;
            }
        }

        public static int CreateInternship(InternshipModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int internshipAdded = 0;
                Internship internship = new Internship()
                {
                    UserId = model.userId,
                    Title = model.title,
                    Description = model.description,
                    IsActicve = 1,
                    ExpiryDate = model.expiryDate,
                    IsPartTimeAvailable = model.isPartTimeAvailable ? 1 : 0,
                    IsWFHAvailable = model.isWFHAvailable ? 1 : 0,
                    JobOffer = model.jobOffer ? 1 : 0,
                    MinStipend = model.minStipend,
                    MaxStipend = model.maxStipend,
                    PostedOn = DateTime.Now,
                    LastUpdatedOn = DateTime.Now,
                    PostsAvailable = model.postsAvailable,
                    StartDate = model.startDate
                };
                context.Internships.Add(internship);
                internshipAdded += context.SaveChanges();
                foreach (var item in model.locations)
                {
                    context.InternshipCities.Add(new InternshipCity()
                    {
                        InternshipId = internship.InternshipId,
                        CityId = item.value
                    });
                }
                internshipAdded += context.SaveChanges();

                bool hasQuestions = false;
                if (model.questionOne != "")
                {
                    context.InternshipQuestions.Add(new InternshipQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionOne,
                        InternshipId = internship.InternshipId
                    });
                    hasQuestions = true;
                }
                if (model.questionTwo != "")
                {
                    context.InternshipQuestions.Add(new InternshipQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionTwo,
                        InternshipId = internship.InternshipId
                    });
                    hasQuestions = true;
                }
                if (model.questionThree != "")
                {
                    context.InternshipQuestions.Add(new InternshipQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionThree,
                        InternshipId = internship.InternshipId
                    });
                    hasQuestions = true;
                }
                if (hasQuestions)
                {
                    internshipAdded += context.SaveChanges();
                }
                return internshipAdded;
            }
        }
    }
}