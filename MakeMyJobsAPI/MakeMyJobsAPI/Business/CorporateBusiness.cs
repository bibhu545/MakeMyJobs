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

                    corporateInfoModel.corporateJobs = CorporateBusiness.GetJobsByUser(corporateInfoModel.userId, 0, true);
                    corporateInfoModel.corporateInternships = CorporateBusiness.GetInternshipsByUser(corporateInfoModel.userId);
                    
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
                if(model.questionOne != null)
                {
                    context.JobQuestions.Add(new JobQuestion() {
                        IsActive = 1,
                        Question = model.questionOne,
                        JobId = job.JobId
                    });
                    hasQuestions = true;
                }
                if(model.questionTwo != null)
                {
                    context.JobQuestions.Add(new JobQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionTwo,
                        JobId = job.JobId
                    });
                    hasQuestions = true;
                }
                if(model.questionThree != null)
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

        public static int UpdateJob(JobModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int updated = 0;
                Job job = context.Jobs.FirstOrDefault(x => x.JobId == model.jobId);
                if (job == null)
                {
                    return updated;
                }
                else
                {
                    job.JobTitle = model.jobTitle;
                    job.Description = model.description;
                    job.MaxSalary = model.maxSalary;
                    job.MinSalary = model.minSalary;
                    job.MinExperience = model.experience;
                    job.NumberOfPosts = model.postsAvailable;
                    job.PostedOn = DateTime.Now;
                    job.LastUpdatedOn = DateTime.Now;
                    job.ExpiaryDate = model.expiryDate;
                    updated += context.SaveChanges();

                    foreach (var item in model.locations)
                    {
                        var location = context.JobCities.FirstOrDefault(x => x.CityId == item.value && x.JobId == model.jobId);
                        if(location != null)
                        {
                            context.JobCities.Remove(location);
                            updated += context.SaveChanges();
                        }
                        context.JobCities.Add(new JobCity()
                        {
                            JobId = job.JobId,
                            CityId = item.value
                        });
                    }
                    updated += context.SaveChanges();

                    var questions = context.JobQuestions.Where(x => x.JobId == model.jobId).ToList();
                    foreach (var item in questions)
                    {
                        context.Entry(item).State = System.Data.Entity.EntityState.Deleted;
                    }
                    updated += context.SaveChanges();

                    bool hasQuestions = false;
                    if (model.questionOne != null)
                    {
                        context.JobQuestions.Add(new JobQuestion()
                        {
                            IsActive = 1,
                            Question = model.questionOne,
                            JobId = job.JobId
                        });
                        hasQuestions = true;
                    }
                    if (model.questionTwo != null)
                    {
                        context.JobQuestions.Add(new JobQuestion()
                        {
                            IsActive = 1,
                            Question = model.questionTwo,
                            JobId = job.JobId
                        });
                        hasQuestions = true;
                    }
                    if (model.questionThree != null)
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
                        updated += context.SaveChanges();
                    }
                    return updated;
                }
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
                if (model.questionOne != null)
                {
                    context.InternshipQuestions.Add(new InternshipQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionOne,
                        InternshipId = internship.InternshipId
                    });
                    hasQuestions = true;
                }
                if (model.questionTwo != null)
                {
                    context.InternshipQuestions.Add(new InternshipQuestion()
                    {
                        IsActive = 1,
                        Question = model.questionTwo,
                        InternshipId = internship.InternshipId
                    });
                    hasQuestions = true;
                }
                if (model.questionThree != null)
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

        public static List<JobResponseModel> GetJobsByUser(int id, int page = 0, bool requestFromHome = false)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<JobResponseModel> jobs= context.Jobs.Where(x => x.userId == id && x.IsActive == 1).Select(x => new JobResponseModel()
                {
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

                if(page > 0)
                {
                    jobs = jobs.Skip(page * 4).ToList();
                }

                if (!requestFromHome)
                {
                    jobs = jobs.Take(4).ToList();
                }

                foreach (var item in jobs)
                {
                    item.locations = context.JobCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new {
                        cityId = jc.CityId,
                        cityName = c.CityName,
                        jobId = jc.JobId
                    }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel()
                    {
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
                    if(questions != null)
                    {
                        if (questions.Count == 1)
                        {
                            item.questionOne = questions[0];
                        }
                        if (questions.Count == 2)
                        {
                            item.questionOne = questions[0];
                            item.questionTwo = questions[1];
                        }
                        if (questions.Count == 3)
                        {
                            item.questionOne = questions[0];
                            item.questionTwo = questions[1];
                            item.questionThree = questions[2];
                        }
                    }
                }
                return jobs;
            }
        }

        public static List<InternshipResponseModel> GetInternshipsByUser(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<InternshipResponseModel> internships = context.Internships.Where(x => x.UserId == id && x.IsActicve == 1).Select(x => new InternshipResponseModel()
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

                foreach (var item in internships)
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
                    if (questions != null)
                    {
                        if (questions.Count == 1)
                        {
                            item.questionOne = questions[0];
                        }
                        if (questions.Count == 2)
                        {
                            item.questionOne = questions[0];
                            item.questionTwo = questions[1];
                        }
                        if (questions.Count == 3)
                        {
                            item.questionOne = questions[0];
                            item.questionTwo = questions[1];
                            item.questionThree = questions[2];
                        }
                    }
                }
                return internships;
            }
        }

        public static JobResponseModel GetJobInfo(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var job = context.Jobs.FirstOrDefault(x => x.JobId == id && x.IsActive == 1);
                JobResponseModel jobResponse = new JobResponseModel()
                {
                    jobId = job.JobId,
                    jobTitle = job.JobTitle,
                    description = job.Description,
                    experience = job.MinExperience,
                    IsActive = job.IsActive,
                    minSalary = job.MinSalary,
                    maxSalary = job.MaxSalary,
                    postsAvailable = job.NumberOfPosts,
                    userId = job.userId,
                    expiryDate = job.ExpiaryDate,
                    LastUpdatedOn = job.LastUpdatedOn,
                    postedOn = job.PostedOn
                };
                jobResponse.locations = context.JobCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new {
                    cityId = jc.CityId,
                    cityName = c.CityName,
                    jobId = jc.JobId
                }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
                {
                    value = x.cityId,
                    text = x.cityName
                }).ToList();

                foreach (var city in jobResponse.locations)
                {
                    jobResponse.locationNames += city.text + ", ";
                }
                jobResponse.locationNames = jobResponse.locationNames.Substring(0, jobResponse.locationNames.Length - 2);

                List<String> questions = context.JobQuestions.Join(context.Jobs, jq => jq.JobId, j => j.JobId, (jq, j) => new
                {
                    jobId = j.JobId,
                    question = jq.Question
                }).Where(x => x.jobId == jobResponse.jobId).Select(x => x.question).ToList();
                if (questions != null)
                {
                    if (questions.Count == 1)
                    {
                        jobResponse.questionOne = questions[0];
                    }
                    if (questions.Count == 2)
                    {
                        jobResponse.questionOne = questions[0];
                        jobResponse.questionTwo = questions[1];
                    }
                    if (questions.Count == 3)
                    {
                        jobResponse.questionOne = questions[0];
                        jobResponse.questionTwo = questions[1];
                        jobResponse.questionThree = questions[2];
                    }
                }
                return jobResponse;
            }
        }

        public static bool DeleteJob(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var job = context.Jobs.FirstOrDefault(x => x.JobId == id);
                if (job != null)
                {
                    job.IsActive = 2;
                    int deleted = context.SaveChanges();
                    return deleted > 0;
                }
                else
                {
                    return false;
                }
            }
        }

        public static InternshipResponseModel GetInternshipInfo(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var internship = context.Internships.FirstOrDefault(x => x.InternshipId == id && x.IsActicve == 1);
                InternshipResponseModel internshipResponse = new InternshipResponseModel() { 
                    internshipId = internship.InternshipId,
                    userId = internship.UserId,
                    title = internship.Title,
                    description = internship.Description,
                    isActicve = internship.IsActicve,
                    expiryDate = internship.ExpiryDate,
                    isPartTimeAvailable = internship.IsPartTimeAvailable,
                    isWFHAvailable = internship.IsWFHAvailable,
                    jobOffer = internship.JobOffer,
                    minStipend = internship.MinStipend,
                    maxStipend = internship.MaxStipend,
                    postedOn = internship.PostedOn,
                    lastUpdatedOn = internship.LastUpdatedOn,
                    postsAvailable = internship.PostsAvailable,
                    startDate = internship.StartDate
                };

                internshipResponse.locations = context.InternshipCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new {
                    cityId = ic.CityId,
                    cityName = c.CityName,
                    internshipId = ic.InternshipId
                }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => new DropdownModel()
                {
                    value = x.cityId,
                    text = x.cityName
                }).ToList();

                foreach (var city in internshipResponse.locations)
                {
                    internshipResponse.locationNames += city.text + ", ";
                }
                internshipResponse.locationNames = internshipResponse.locationNames.Substring(0, internshipResponse.locationNames.Length - 2);

                List<String> questions = context.InternshipQuestions.Join(context.Internships, iq => iq.InternshipId, i => i.InternshipId, (iq, i) => new
                {
                    internshipId = i.InternshipId,
                    question = iq.Question
                }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => x.question).ToList();
                if (questions != null)
                {
                    if (questions.Count == 1)
                    {
                        internshipResponse.questionOne = questions[0];
                    }
                    if (questions.Count == 2)
                    {
                        internshipResponse.questionOne = questions[0];
                        internshipResponse.questionTwo = questions[1];
                    }
                    if (questions.Count == 3)
                    {
                        internshipResponse.questionOne = questions[0];
                        internshipResponse.questionTwo = questions[1];
                        internshipResponse.questionThree = questions[2];
                    }
                }

                return internshipResponse ;
            }
        }

        public static bool DeleteInternship(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var internship = context.Internships.FirstOrDefault(x => x.InternshipId == id);
                if (internship != null)
                {
                    internship.IsActicve = 2;
                    int deleted = context.SaveChanges();
                    return deleted > 0;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}