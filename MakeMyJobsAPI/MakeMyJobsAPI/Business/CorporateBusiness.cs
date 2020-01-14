using MakeMyJobsAPI.EDMX;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Business
{
    public class CorporateBusiness
    {
        public static List<JobResponseModel> GetJobs(PostFilterModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<JobResponseModel> jobs = context.Posts.Where(x => x.IsActive == 1).Select(x => new JobResponseModel()
                {
                    jobId = x.PostId,
                    jobTitle = x.Title,
                    description = x.Description,
                    experience = x.MinExperience ?? 0,
                    IsActive = x.IsActive,
                    minSalary = x.MinSalary ?? 0,
                    maxSalary = x.MaxSalary,
                    postsAvailable = x.PostsAvailable,
                    userId = x.UserId,
                    expiryDate = x.ExpiaryDate,
                    LastUpdatedOn = x.LastUpdatedOn,
                    postedOn = x.PostedOn
                }).ToList();

                var appliedJobIds = context.PostApplications.Where(x => x.UserId == model.userId).Select(x => x.PostId).ToList();

                foreach (var item in jobs)
                {
                    if (appliedJobIds != null)
                    {
                        if (appliedJobIds.IndexOf(item.jobId) >= 0)
                        {
                            item.applied = true;
                        }
                    }

                    item.locations = context.PostCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new
                    {
                        cityId = jc.CityId,
                        cityName = c.CityName,
                        jobId = jc.PostId
                    }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel()
                    {
                        value = x.cityId,
                        text = x.cityName
                    }).ToList();

                    foreach (var city in item.locations)
                    {
                        item.locationNames += city.text + ", ";
                    }
                    if (item.locationNames != null)
                    {
                        item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);
                    }

                    item.tags = context.PostTags.Join(context.Tags, jt => jt.TagId, t => t.TagId, (jt, t) => new
                    {
                        tagId = jt.TagId,
                        tagName = t.TagName,
                        jobId = jt.PostId
                    }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel()
                    {
                        value = x.tagId,
                        text = x.tagName
                    }).ToList();

                    foreach (var tag in item.tags)
                    {
                        item.tagNames += tag.text + ", ";
                    }
                    if (item.tagNames != null)
                    {
                        item.tagNames = item.tagNames.Substring(0, item.tagNames.Length - 2);
                    }

                    item.skills = context.PostSkills.Join(context.Skills, js => js.SkillId, s => s.SkillId, (jt, t) => new
                    {
                        skillId = jt.SkillId,
                        skillName = t.SkillName,
                        jobId = jt.PostId
                    }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel()
                    {
                        value = x.skillId,
                        text = x.skillName
                    }).ToList();

                    foreach (var skill in item.skills)
                    {
                        item.skillNames += skill.text + ", ";
                    }
                    if (item.skillNames != null)
                    {
                        item.skillNames = item.skillNames.Substring(0, item.skillNames.Length - 2);
                    }

                    List<String> questions = context.PostQuestions.Join(context.Posts, jq => jq.PostId, j => j.PostId, (jq, j) => new
                    {
                        jobId = j.PostId,
                        question = jq.Question
                    }).Where(x => x.jobId == item.jobId).Select(x => x.question).ToList();
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
                return jobs;
            }
        }

        //public static List<InternshipResponseModel> GetInternships(int userId = 0)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<InternshipResponseModel> internships = context.Internships.Where(x => x.IsActicve == 1).Select(x => new InternshipResponseModel()
        //        {
        //            internshipId = x.InternshipId,
        //            userId = x.UserId,
        //            title = x.Title,
        //            description = x.Description,
        //            isActicve = x.IsActicve,
        //            expiryDate = x.ExpiryDate,
        //            isPartTimeAvailable = x.IsPartTimeAvailable,
        //            isWFHAvailable = x.IsWFHAvailable,
        //            jobOffer = x.JobOffer,
        //            minStipend = x.MinStipend,
        //            maxStipend = x.MaxStipend,
        //            postedOn = x.PostedOn,
        //            lastUpdatedOn = x.LastUpdatedOn,
        //            postsAvailable = x.PostsAvailable,
        //            startDate = x.StartDate
        //        }).ToList();

        //        var appliedInternshipIds = context.JobApplications.Where(x => x.UserId == userId).Select(x => x.JobId).ToList();

        //        foreach (var item in internships)
        //        {
        //            if (appliedInternshipIds != null)
        //            {
        //                if (appliedInternshipIds.IndexOf(item.internshipId) >= 0)
        //                {
        //                    item.applied = true;
        //                }
        //            }
        //            item.locations = context.InternshipCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
        //            {
        //                cityId = ic.CityId,
        //                cityName = c.CityName,
        //                internshipId = ic.InternshipId
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => new DropdownModel()
        //            {
        //                value = x.cityId,
        //                text = x.cityName
        //            }).ToList();

        //            foreach (var city in item.locations)
        //            {
        //                item.locationNames += city.text + ", ";
        //            }
        //            if (item.locationNames != null)
        //            {
        //                item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);
        //            }

        //            item.skills = context.InternshipSkills.Join(context.Skills, ic => ic.SkillId, s => s.SkillId, (ic, s) => new
        //            {
        //                skillId = ic.SkillId,
        //                skillName = s.SkillName,
        //                internshipId = ic.InternshipId
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => new DropdownModel()
        //            {
        //                value = x.skillId,
        //                text = x.skillName
        //            }).ToList();

        //            foreach (var skill in item.skills)
        //            {
        //                item.skillNames += skill.text + ", ";
        //            }
        //            if (item.skillNames != null)
        //            {
        //                item.skillNames = item.skillNames.Substring(0, item.skillNames.Length - 2);
        //            }

        //            item.tags = context.InternshipTags.Join(context.Tags, it => it.TagId, t => t.TagId, (it, t) => new
        //            {
        //                tagId = it.TagId,
        //                tagName = t.TagName,
        //                internshipId = it.InternshipId
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => new DropdownModel()
        //            {
        //                value = x.tagId,
        //                text = x.tagName
        //            }).ToList();

        //            foreach (var city in item.tags)
        //            {
        //                item.tagNames += city.text + ", ";
        //            }
        //            if (item.tagNames != null)
        //            {
        //                item.tagNames = item.tagNames.Substring(0, item.tagNames.Length - 2);
        //            }

        //            List<String> questions = context.InternshipQuestions.Join(context.Internships, iq => iq.InternshipId, i => i.InternshipId, (iq, i) => new
        //            {
        //                internshipId = i.InternshipId,
        //                question = iq.Question
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => x.question).ToList();
        //            if (questions != null)
        //            {
        //                if (questions.Count == 1)
        //                {
        //                    item.questionOne = questions[0];
        //                }
        //                if (questions.Count == 2)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                }
        //                if (questions.Count == 3)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                    item.questionThree = questions[2];
        //                }
        //            }
        //        }
        //        return internships;
        //    }
        //}

        //public static CorporateInfoModel GetCorporateInfo(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        if (context.Corporates.Any(x => x.UserId == id))
        //        {
        //            CorporateInfoModel corporateInfoModel = context.Corporates.Join(context.States, c => c.State, st => st.StateId, (c, st) => new
        //            {
        //                StateName = st.StateName,
        //                corporate = c
        //            }).Join(context.Countries, c => c.corporate.Country, con => con.CountryId, (c, con) => new
        //            {
        //                corporate = c,
        //                stateName = c.StateName,
        //                countryName = con.CountryName
        //            }).Join(context.Users, c => c.corporate.corporate.UserId, u => u.UserId, (c, u) => new CorporateInfoModel()
        //            {
        //                corporateId = c.corporate.corporate.CorporateId,
        //                userId = c.corporate.corporate.UserId,
        //                firstName = c.corporate.corporate.FirstName,
        //                lastName = c.corporate.corporate.LastName,
        //                city = c.corporate.corporate.City,
        //                contactNumber = c.corporate.corporate.ContactNumber,
        //                dateOfBirth = c.corporate.corporate.DateOfBirth,
        //                logo = c.corporate.corporate.Logo,
        //                dateJoined = c.corporate.corporate.DateJoined,
        //                address = c.corporate.corporate.Address + (c.corporate.corporate.City == null ? "" : (", " + c.corporate.corporate.City)) + (c.corporate.corporate.State == 0 ? "" : (", " + c.corporate.StateName)) + (c.corporate.corporate.Country == 0 ? "" : (", " + c.countryName)),
        //                state = c.corporate.corporate.State,
        //                country = c.corporate.corporate.Country,
        //                email = u.Email,
        //                zipCode = c.corporate.corporate.ZipCode,
        //                companyName = c.corporate.corporate.CompanyName,
        //                companyInfo = c.corporate.corporate.CompanyInfo,
        //                isActive = c.corporate.corporate.IsActive
        //            }).FirstOrDefault(x => x.userId == id);

        //            corporateInfoModel.corporateJobs = CorporateBusiness.GetJobsByUser(corporateInfoModel.userId, true);
        //            corporateInfoModel.corporateInternships = CorporateBusiness.GetInternshipsByUser(corporateInfoModel.userId);

        //            return corporateInfoModel;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        //public static CorporateInfoModel GetCorporateInfoForEdit(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        if (context.Corporates.Any(x => x.UserId == id))
        //        {
        //            CorporateInfoModel corporateInfoModel = context.Corporates.Join(context.Users, c => c.UserId, u => u.UserId, (c, u) => new CorporateInfoModel()
        //            {
        //                corporateId = c.CorporateId,
        //                userId = c.UserId,
        //                firstName = c.FirstName,
        //                lastName = c.LastName,
        //                city = c.City,
        //                contactNumber = c.ContactNumber,
        //                dateOfBirth = c.DateOfBirth,
        //                logo = c.Logo,
        //                dateJoined = c.DateJoined,
        //                address = c.Address,
        //                state = c.State,
        //                country = c.Country,
        //                email = u.Email,
        //                zipCode = c.ZipCode,
        //                companyName = c.CompanyName,
        //                companyInfo = c.CompanyInfo,
        //                isActive = c.IsActive
        //            }).FirstOrDefault(x => x.userId == id);
        //            return corporateInfoModel;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        //public static CorporateInfoModel UpdateCorporateBasicInfo(CorporateInfoModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int updated = 0;
        //        var user = context.Users.FirstOrDefault(x => x.UserId == model.userId && x.IsActive == 1);
        //        var corporate = context.Corporates.FirstOrDefault(x => x.CorporateId == model.corporateId);
        //        if (user == null || corporate == null)
        //        {
        //            return null;
        //        }
        //        else
        //        {
        //            user.Email = model.email;
        //            updated += context.SaveChanges();
        //            corporate.FirstName = model.firstName;
        //            corporate.LastName = model.lastName;
        //            corporate.ContactNumber = model.contactNumber;
        //            corporate.DateOfBirth = model.dateOfBirth;
        //            corporate.City = model.city;
        //            corporate.Address = model.address;
        //            corporate.State = model.state;
        //            corporate.Country = model.country;
        //            corporate.ZipCode = model.zipCode;
        //            corporate.CompanyName = model.companyName;
        //            corporate.CompanyInfo = model.companyInfo;
        //            updated += context.SaveChanges();
        //        }
        //        return GetUpdatedCorporateInfo(user.UserId, corporate.CorporateId);
        //    }
        //}

        //public static int SaveLogo(int corporateId, String fileName, String fileNameOnDisk, long fileSize)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var previousLogo = context.CorporateDocuments.FirstOrDefault(x => x.CorporateId == corporateId && x.DocumentType == 1);
        //        if (previousLogo != null)
        //        {
        //            context.Entry(previousLogo).State = System.Data.Entity.EntityState.Deleted;
        //        }
        //        else
        //        {
        //            context.CorporateDocuments.Add(new CorporateDocument()
        //            {
        //                DocumentName = fileName,
        //                DocumentNameOnDisk = fileNameOnDisk,
        //                DocumentSize = fileSize,
        //                DocumentType = 1,
        //                IsActive = 1,
        //                LastUpdatedOn = DateTime.Now,
        //                CorporateId = corporateId
        //            });
        //        }
        //        return context.SaveChanges();
        //    }
        //}

        //private static CorporateInfoModel GetUpdatedCorporateInfo(int userId, int corporateId)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var user = context.Users.FirstOrDefault(x => x.UserId == userId && x.IsActive == 1);
        //        var corporate = context.Corporates.FirstOrDefault(x => x.CorporateId == corporateId);
        //        if (user == null || corporate == null)
        //        {
        //            return null;
        //        }
        //        else
        //        {
        //            return new CorporateInfoModel()
        //            {
        //                userId = userId,
        //                corporateId = corporateId,
        //                email = user.Email,
        //                firstName = corporate.FirstName,
        //                lastName = corporate.LastName,
        //                contactNumber = corporate.ContactNumber,
        //                city = corporate.City,
        //                address = corporate.Address,
        //                state = corporate.State,
        //                country = corporate.Country,
        //                dateOfBirth = corporate.DateOfBirth,
        //                zipCode = corporate.ZipCode,
        //                companyName = corporate.CompanyName,
        //                companyInfo = corporate.CompanyInfo,
        //                dateJoined = corporate.DateJoined,
        //                logo = corporate.Logo,
        //                isActive = corporate.IsActive
        //            };
        //        }
        //    }
        //}

        public static int CreateJob(JobModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int jobAdded = 0;
                Post job = new Post()
                {
                    UserId = model.userId,
                    Title = model.jobTitle,
                    Description = model.description,
                    IsActive = 1,
                    MaxSalary = model.maxSalary,
                    MinSalary = model.minSalary,
                    MinExperience = model.experience,
                    PostsAvailable = model.postsAvailable,
                    PostedOn = DateTime.UtcNow,
                    LastUpdatedOn = DateTime.UtcNow,
                    ExpiaryDate = model.expiryDate
                };
                context.Posts.Add(job);
                jobAdded += context.SaveChanges();

                if (model.locations != null)
                {
                    foreach (var item in model.locations)
                    {
                        context.PostCities.Add(new PostCity()
                        {
                            PostId = job.PostId,
                            CityId = item.value
                        });
                    }
                    jobAdded += context.SaveChanges();
                }

                if (model.tags != null)
                {
                    foreach (var item in model.tags)
                    {
                        context.PostTags.Add(new PostTag()
                        {
                            PostId = job.PostId,
                            TagId = item.value
                        });
                    }
                    jobAdded += context.SaveChanges();
                }

                if (model.skills != null)
                {
                    foreach (var item in model.skills)
                    {
                        context.PostSkills.Add(new PostSkill()
                        {
                            PostId = job.PostId,
                            SkillId = item.value
                        });
                    }
                    jobAdded += context.SaveChanges();
                }

                bool hasQuestions = false;
                if (model.questionOne != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionOne,
                        PostId = job.PostId
                    });
                    hasQuestions = true;
                }
                if (model.questionTwo != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionTwo,
                        PostId = job.PostId
                    });
                    hasQuestions = true;
                }
                if (model.questionThree != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionThree,
                        PostId = job.PostId
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

        //public static int UpdateJob(JobModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int updated = 0;
        //        Job job = context.Jobs.FirstOrDefault(x => x.JobId == model.jobId);
        //        if (job == null)
        //        {
        //            return updated;
        //        }
        //        else
        //        {
        //            job.JobTitle = model.jobTitle;
        //            job.Description = model.description;
        //            job.MaxSalary = model.maxSalary;
        //            job.MinSalary = model.minSalary;
        //            job.MinExperience = model.experience;
        //            job.NumberOfPosts = model.postsAvailable;
        //            job.PostedOn = DateTime.Now;
        //            job.LastUpdatedOn = DateTime.Now;
        //            job.ExpiaryDate = model.expiryDate;
        //            updated += context.SaveChanges();


        //            var prevLocations = context.JobCities.Where(x => x.JobId == model.jobId).ToList();
        //            foreach (var item in prevLocations)
        //            {
        //                context.JobCities.Remove(item);
        //            }
        //            int deleted = context.SaveChanges();

        //            if (model.locations != null)
        //            {
        //                foreach (var item in model.locations)
        //                {
        //                    context.JobCities.Add(new JobCity()
        //                    {
        //                        JobId = job.JobId,
        //                        CityId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var prevTags = context.JobTags.Where(x => x.JobId == model.jobId).ToList();
        //            foreach (var item in prevTags)
        //            {
        //                context.JobTags.Remove(item);
        //            }
        //            context.SaveChanges();

        //            if (model.tags != null)
        //            {
        //                foreach (var item in model.tags)
        //                {
        //                    context.JobTags.Add(new JobTag()
        //                    {
        //                        JobId = job.JobId,
        //                        TagId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var prevSkills = context.JobSkills.Where(x => x.JobId == model.jobId).ToList();
        //            foreach (var item in prevSkills)
        //            {
        //                context.JobSkills.Remove(item);
        //            }
        //            context.SaveChanges();

        //            if (model.skills != null)
        //            {
        //                foreach (var item in model.skills)
        //                {
        //                    context.JobSkills.Add(new JobSkill()
        //                    {
        //                        JobId = job.JobId,
        //                        SkillId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var questions = context.JobQuestions.Where(x => x.JobId == model.jobId).ToList();
        //            foreach (var item in questions)
        //            {
        //                context.Entry(item).State = System.Data.Entity.EntityState.Deleted;
        //            }
        //            updated += context.SaveChanges();

        //            bool hasQuestions = false;
        //            if (model.questionOne != null)
        //            {
        //                context.JobQuestions.Add(new JobQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionOne,
        //                    JobId = job.JobId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (model.questionTwo != null)
        //            {
        //                context.JobQuestions.Add(new JobQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionTwo,
        //                    JobId = job.JobId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (model.questionThree != null)
        //            {
        //                context.JobQuestions.Add(new JobQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionThree,
        //                    JobId = job.JobId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (hasQuestions)
        //            {
        //                updated += context.SaveChanges();
        //            }
        //            return updated;
        //        }
        //    }
        //}

        //public static int CreateInternship(InternshipModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int internshipAdded = 0;
        //        Internship internship = new Internship()
        //        {
        //            UserId = model.userId,
        //            Title = model.title,
        //            Description = model.description,
        //            IsActicve = 1,
        //            ExpiryDate = model.expiryDate,
        //            IsPartTimeAvailable = model.isPartTimeAvailable ? 1 : 0,
        //            IsWFHAvailable = model.isWFHAvailable ? 1 : 0,
        //            JobOffer = model.jobOffer ? 1 : 0,
        //            MinStipend = model.minStipend,
        //            MaxStipend = model.maxStipend,
        //            PostedOn = DateTime.Now,
        //            LastUpdatedOn = DateTime.Now,
        //            PostsAvailable = model.postsAvailable,
        //            StartDate = model.startDate
        //        };
        //        context.Internships.Add(internship);
        //        internshipAdded += context.SaveChanges();

        //        foreach (var item in model.locations)
        //        {
        //            context.InternshipCities.Add(new InternshipCity()
        //            {
        //                InternshipId = internship.InternshipId,
        //                CityId = item.value
        //            });
        //        }
        //        internshipAdded += context.SaveChanges();

        //        foreach (var item in model.skills)
        //        {
        //            context.InternshipSkills.Add(new InternshipSkill()
        //            {
        //                InternshipId = internship.InternshipId,
        //                SkillId = item.value
        //            });
        //        }
        //        internshipAdded += context.SaveChanges();

        //        foreach (var item in model.tags)
        //        {
        //            context.InternshipTags.Add(new InternshipTag()
        //            {
        //                InternshipId = internship.InternshipId,
        //                TagId = item.value
        //            });
        //        }
        //        internshipAdded += context.SaveChanges();

        //        bool hasQuestions = false;
        //        if (model.questionOne != null)
        //        {
        //            context.InternshipQuestions.Add(new InternshipQuestion()
        //            {
        //                IsActive = 1,
        //                Question = model.questionOne,
        //                InternshipId = internship.InternshipId
        //            });
        //            hasQuestions = true;
        //        }
        //        if (model.questionTwo != null)
        //        {
        //            context.InternshipQuestions.Add(new InternshipQuestion()
        //            {
        //                IsActive = 1,
        //                Question = model.questionTwo,
        //                InternshipId = internship.InternshipId
        //            });
        //            hasQuestions = true;
        //        }
        //        if (model.questionThree != null)
        //        {
        //            context.InternshipQuestions.Add(new InternshipQuestion()
        //            {
        //                IsActive = 1,
        //                Question = model.questionThree,
        //                InternshipId = internship.InternshipId
        //            });
        //            hasQuestions = true;
        //        }
        //        if (hasQuestions)
        //        {
        //            internshipAdded += context.SaveChanges();
        //        }
        //        return internshipAdded;
        //    }
        //}

        //public static List<JobResponseModel> GetJobsByUser(int id, bool requestFromHome = false)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<JobResponseModel> jobs = context.Jobs.Where(x => x.userId == id && x.IsActive == 1).Select(x => new JobResponseModel()
        //        {
        //            jobId = x.JobId,
        //            jobTitle = x.JobTitle,
        //            description = x.Description,
        //            experience = x.MinExperience,
        //            IsActive = x.IsActive,
        //            minSalary = x.MinSalary,
        //            maxSalary = x.MaxSalary,
        //            postsAvailable = x.NumberOfPosts,
        //            userId = x.userId,
        //            expiryDate = x.ExpiaryDate,
        //            LastUpdatedOn = x.LastUpdatedOn,
        //            postedOn = x.PostedOn
        //        }).ToList();

        //        //if (!requestFromHome)
        //        //{
        //        //    jobs = jobs.Take(4).ToList();
        //        //}

        //        foreach (var item in jobs)
        //        {
        //            item.totalApplications = context.JobApplications.Where(x => x.JobId == item.jobId).ToList().Count;

        //            item.locations = context.JobCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new
        //            {
        //                cityId = jc.CityId,
        //                cityName = c.CityName,
        //                jobId = jc.JobId
        //            }).Where(x => x.jobId == item.jobId).Select(x => new DropdownModel()
        //            {
        //                value = x.cityId,
        //                text = x.cityName
        //            }).ToList();

        //            foreach (var city in item.locations)
        //            {
        //                item.locationNames += city.text + ", ";
        //            }
        //            if (item.locationNames != null)
        //            {
        //                item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);
        //            }
        //            List<String> questions = context.JobQuestions.Join(context.Jobs, jq => jq.JobId, j => j.JobId, (jq, j) => new
        //            {
        //                jobId = j.JobId,
        //                question = jq.Question
        //            }).Where(x => x.jobId == item.jobId).Select(x => x.question).ToList();
        //            if (questions != null)
        //            {
        //                if (questions.Count == 1)
        //                {
        //                    item.questionOne = questions[0];
        //                }
        //                if (questions.Count == 2)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                }
        //                if (questions.Count == 3)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                    item.questionThree = questions[2];
        //                }
        //            }
        //        }
        //        return jobs;
        //    }
        //}

        //public static List<InternshipResponseModel> GetInternshipsByUser(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<InternshipResponseModel> internships = context.Internships.Where(x => x.UserId == id && x.IsActicve == 1).Select(x => new InternshipResponseModel()
        //        {
        //            internshipId = x.InternshipId,
        //            userId = x.UserId,
        //            title = x.Title,
        //            description = x.Description,
        //            isActicve = x.IsActicve,
        //            expiryDate = x.ExpiryDate,
        //            isPartTimeAvailable = x.IsPartTimeAvailable,
        //            isWFHAvailable = x.IsWFHAvailable,
        //            jobOffer = x.JobOffer,
        //            minStipend = x.MinStipend,
        //            maxStipend = x.MaxStipend,
        //            postedOn = x.PostedOn,
        //            lastUpdatedOn = x.LastUpdatedOn,
        //            postsAvailable = x.PostsAvailable,
        //            startDate = x.StartDate
        //        }).ToList();

        //        foreach (var item in internships)
        //        {
        //            item.locations = context.InternshipCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
        //            {
        //                cityId = ic.CityId,
        //                cityName = c.CityName,
        //                internshipId = ic.InternshipId
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => new DropdownModel()
        //            {
        //                value = x.cityId,
        //                text = x.cityName
        //            }).ToList();

        //            foreach (var city in item.locations)
        //            {
        //                item.locationNames += city.text + ", ";
        //            }
        //            if (item.locationNames != null)
        //            {
        //                item.locationNames = item.locationNames.Substring(0, item.locationNames.Length - 2);
        //            }

        //            List<String> questions = context.InternshipQuestions.Join(context.Internships, iq => iq.InternshipId, i => i.InternshipId, (iq, i) => new
        //            {
        //                internshipId = i.InternshipId,
        //                question = iq.Question
        //            }).Where(x => x.internshipId == item.internshipId).Select(x => x.question).ToList();
        //            if (questions != null)
        //            {
        //                if (questions.Count == 1)
        //                {
        //                    item.questionOne = questions[0];
        //                }
        //                if (questions.Count == 2)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                }
        //                if (questions.Count == 3)
        //                {
        //                    item.questionOne = questions[0];
        //                    item.questionTwo = questions[1];
        //                    item.questionThree = questions[2];
        //                }
        //            }
        //        }
        //        return internships;
        //    }
        //}

        //public static JobResponseModel GetJobInfo(int id, int userId = 0)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var job = context.Jobs.FirstOrDefault(x => x.JobId == id && x.IsActive == 1);
        //        JobResponseModel jobResponse = new JobResponseModel()
        //        {
        //            jobId = job.JobId,
        //            jobTitle = job.JobTitle,
        //            description = job.Description,
        //            experience = job.MinExperience,
        //            IsActive = job.IsActive,
        //            minSalary = job.MinSalary,
        //            maxSalary = job.MaxSalary,
        //            postsAvailable = job.NumberOfPosts,
        //            userId = job.userId,
        //            expiryDate = job.ExpiaryDate,
        //            LastUpdatedOn = job.LastUpdatedOn,
        //            postedOn = job.PostedOn
        //        };

        //        var corporate = context.Corporates.FirstOrDefault(x => x.UserId == jobResponse.userId);
        //        jobResponse.companyName = corporate.CompanyName;
        //        jobResponse.companyInfo = corporate.CompanyInfo;

        //        var checkApplication = context.JobApplications.FirstOrDefault(x => x.UserId == userId && x.JobId == jobResponse.jobId);
        //        if (checkApplication != null)
        //        {
        //            jobResponse.message = checkApplication.Message;
        //            jobResponse.applied = true;
        //        }

        //        jobResponse.locations = context.JobCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new
        //        {
        //            cityId = jc.CityId,
        //            cityName = c.CityName,
        //            jobId = jc.JobId
        //        }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
        //        {
        //            value = x.cityId,
        //            text = x.cityName
        //        }).ToList();

        //        foreach (var city in jobResponse.locations)
        //        {
        //            jobResponse.locationNames += city.text + ", ";
        //        }
        //        if (jobResponse.locationNames != null)
        //        {
        //            jobResponse.locationNames = jobResponse.locationNames.Substring(0, jobResponse.locationNames.Length - 2);
        //        }

        //        jobResponse.tags = context.JobTags.Join(context.Tags, jt => jt.TagId, t => t.TagId, (jt, t) => new
        //        {
        //            tagId = jt.TagId,
        //            tagName = t.TagName,
        //            jobId = jt.JobId
        //        }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
        //        {
        //            value = x.tagId,
        //            text = x.tagName
        //        }).ToList();

        //        foreach (var item in jobResponse.tags)
        //        {
        //            jobResponse.tagNames += item.text + ", ";
        //        }
        //        if (jobResponse.tagNames != null)
        //        {
        //            jobResponse.tagNames = jobResponse.tagNames.Substring(0, jobResponse.tagNames.Length - 2);
        //        }

        //        jobResponse.skills = context.JobSkills.Join(context.Skills, js => js.SkillId, s => s.SkillId, (jt, t) => new
        //        {
        //            skillId = jt.SkillId,
        //            skillName = t.SkillName,
        //            jobId = jt.JobId
        //        }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
        //        {
        //            value = x.skillId,
        //            text = x.skillName
        //        }).ToList();

        //        foreach (var item in jobResponse.skills)
        //        {
        //            jobResponse.skillNames += item.text + ", ";
        //        }
        //        if (jobResponse.skillNames != null)
        //        {
        //            jobResponse.skillNames = jobResponse.skillNames.Substring(0, jobResponse.skillNames.Length - 2);
        //        }

        //        List<String> questions = context.JobQuestions.Join(context.Jobs, jq => jq.JobId, j => j.JobId, (jq, j) => new
        //        {
        //            jobId = j.JobId,
        //            question = jq.Question
        //        }).Where(x => x.jobId == jobResponse.jobId).Select(x => x.question).ToList();
        //        if (questions != null)
        //        {
        //            if (questions.Count == 1)
        //            {
        //                jobResponse.questionOne = questions[0];
        //            }
        //            if (questions.Count == 2)
        //            {
        //                jobResponse.questionOne = questions[0];
        //                jobResponse.questionTwo = questions[1];
        //            }
        //            if (questions.Count == 3)
        //            {
        //                jobResponse.questionOne = questions[0];
        //                jobResponse.questionTwo = questions[1];
        //                jobResponse.questionThree = questions[2];
        //            }
        //        }
        //        return jobResponse;
        //    }
        //}

        //public static bool DeleteJob(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var job = context.Jobs.FirstOrDefault(x => x.JobId == id);
        //        if (job != null)
        //        {
        //            job.IsActive = 2;
        //            int deleted = context.SaveChanges();
        //            return deleted > 0;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //}

        //public static InternshipResponseModel GetInternshipInfo(int id, int userId = 0)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var internship = context.Internships.FirstOrDefault(x => x.InternshipId == id && x.IsActicve == 1);
        //        InternshipResponseModel internshipResponse = new InternshipResponseModel()
        //        {
        //            internshipId = internship.InternshipId,
        //            userId = internship.UserId,
        //            title = internship.Title,
        //            description = internship.Description,
        //            isActicve = internship.IsActicve,
        //            expiryDate = internship.ExpiryDate,
        //            isPartTimeAvailable = internship.IsPartTimeAvailable,
        //            isWFHAvailable = internship.IsWFHAvailable,
        //            jobOffer = internship.JobOffer,
        //            minStipend = internship.MinStipend,
        //            maxStipend = internship.MaxStipend,
        //            postedOn = internship.PostedOn,
        //            lastUpdatedOn = internship.LastUpdatedOn,
        //            postsAvailable = internship.PostsAvailable,
        //            startDate = internship.StartDate
        //        };

        //        var corporate = context.Corporates.FirstOrDefault(x => x.UserId == internshipResponse.userId);
        //        internshipResponse.companyName = corporate.CompanyName;
        //        internshipResponse.companyInfo = corporate.CompanyInfo;

        //        var checkApplication = context.InternshipApplications.FirstOrDefault(x => x.UserId == userId && x.InternshipId == id);
        //        if (checkApplication != null)
        //        {
        //            internshipResponse.message = checkApplication.Message;
        //            internshipResponse.applied = true;
        //        }

        //        internshipResponse.locations = context.InternshipCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
        //        {
        //            cityId = ic.CityId,
        //            cityName = c.CityName,
        //            internshipId = ic.InternshipId
        //        }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => new DropdownModel()
        //        {
        //            value = x.cityId,
        //            text = x.cityName
        //        }).ToList();

        //        foreach (var city in internshipResponse.locations)
        //        {
        //            internshipResponse.locationNames += city.text + ", ";
        //        }
        //        if (internshipResponse.locationNames != null)
        //        {
        //            internshipResponse.locationNames = internshipResponse.locationNames.Substring(0, internshipResponse.locationNames.Length - 2);
        //        }

        //        internshipResponse.skills = context.InternshipSkills.Join(context.Skills, ic => ic.SkillId, s => s.SkillId, (ic, s) => new
        //        {
        //            skillId = ic.SkillId,
        //            skillName = s.SkillName,
        //            internshipId = ic.InternshipId
        //        }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => new DropdownModel()
        //        {
        //            value = x.skillId,
        //            text = x.skillName
        //        }).ToList();

        //        foreach (var skill in internshipResponse.skills)
        //        {
        //            internshipResponse.skillNames += skill.text + ", ";
        //        }
        //        if (internshipResponse.skillNames != null)
        //        {
        //            internshipResponse.skillNames = internshipResponse.skillNames.Substring(0, internshipResponse.skillNames.Length - 2);
        //        }

        //        internshipResponse.tags = context.InternshipTags.Join(context.Tags, it => it.TagId, t => t.TagId, (it, t) => new
        //        {
        //            tagId = it.TagId,
        //            tagName = t.TagName,
        //            internshipId = it.InternshipId
        //        }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => new DropdownModel()
        //        {
        //            value = x.tagId,
        //            text = x.tagName
        //        }).ToList();

        //        foreach (var city in internshipResponse.tags)
        //        {
        //            internshipResponse.tagNames += city.text + ", ";
        //        }
        //        if (internshipResponse.tagNames != null)
        //        {
        //            internshipResponse.tagNames = internshipResponse.tagNames.Substring(0, internshipResponse.tagNames.Length - 2);
        //        }


        //        List<String> questions = context.InternshipQuestions.Join(context.Internships, iq => iq.InternshipId, i => i.InternshipId, (iq, i) => new
        //        {
        //            internshipId = i.InternshipId,
        //            question = iq.Question
        //        }).Where(x => x.internshipId == internshipResponse.internshipId).Select(x => x.question).ToList();
        //        if (questions != null)
        //        {
        //            if (questions.Count == 1)
        //            {
        //                internshipResponse.questionOne = questions[0];
        //            }
        //            if (questions.Count == 2)
        //            {
        //                internshipResponse.questionOne = questions[0];
        //                internshipResponse.questionTwo = questions[1];
        //            }
        //            if (questions.Count == 3)
        //            {
        //                internshipResponse.questionOne = questions[0];
        //                internshipResponse.questionTwo = questions[1];
        //                internshipResponse.questionThree = questions[2];
        //            }
        //        }

        //        return internshipResponse;
        //    }
        //}

        //public static int UpdateInternship(InternshipModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int updated = 0;
        //        Internship internship = context.Internships.FirstOrDefault(x => x.InternshipId == model.internshipId);
        //        if (internship == null)
        //        {
        //            return updated;
        //        }
        //        else
        //        {
        //            internship.Title = model.title;
        //            internship.Description = model.description;
        //            internship.MaxStipend = model.maxStipend;
        //            internship.MinStipend = model.minStipend;
        //            internship.PostsAvailable = model.postsAvailable;
        //            internship.StartDate = model.startDate;
        //            internship.IsPartTimeAvailable = model.isPartTimeAvailable ? 1 : 0;
        //            internship.IsWFHAvailable = model.isWFHAvailable ? 1 : 0;
        //            internship.JobOffer = model.jobOffer ? 1 : 0;
        //            internship.PostedOn = DateTime.Now;
        //            internship.LastUpdatedOn = DateTime.Now;
        //            internship.ExpiryDate = model.expiryDate;
        //            updated += context.SaveChanges();

        //            var prevLocations = context.InternshipCities.Where(x => x.InternshipId == model.internshipId).ToList();
        //            foreach (var item in prevLocations)
        //            {
        //                context.InternshipCities.Remove(item);
        //            }
        //            int deleted = context.SaveChanges();

        //            if (model.locations != null)
        //            {
        //                foreach (var item in model.locations)
        //                {
        //                    context.InternshipCities.Add(new InternshipCity()
        //                    {
        //                        InternshipId = internship.InternshipId,
        //                        CityId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var prevSkills = context.InternshipSkills.Where(x => x.InternshipId == model.internshipId).ToList();
        //            foreach (var item in prevSkills)
        //            {
        //                context.InternshipSkills.Remove(item);
        //            }
        //            context.SaveChanges();

        //            if (model.skills != null)
        //            {
        //                foreach (var item in model.skills)
        //                {
        //                    context.InternshipSkills.Add(new InternshipSkill()
        //                    {
        //                        InternshipId = internship.InternshipId,
        //                        SkillId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var prevTags = context.InternshipTags.Where(x => x.InternshipId == model.internshipId).ToList();
        //            foreach (var item in prevTags)
        //            {
        //                context.InternshipTags.Remove(item);
        //            }
        //            context.SaveChanges();

        //            if (model.tags != null)
        //            {
        //                foreach (var item in model.tags)
        //                {
        //                    context.InternshipTags.Add(new InternshipTag()
        //                    {
        //                        InternshipId = internship.InternshipId,
        //                        TagId = item.value
        //                    });
        //                }
        //                updated += context.SaveChanges();
        //            }

        //            var questions = context.InternshipQuestions.Where(x => x.InternshipId == model.internshipId).ToList();
        //            foreach (var item in questions)
        //            {
        //                context.Entry(item).State = System.Data.Entity.EntityState.Deleted;
        //            }
        //            updated += context.SaveChanges();

        //            bool hasQuestions = false;
        //            if (model.questionOne != null)
        //            {
        //                context.InternshipQuestions.Add(new InternshipQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionOne,
        //                    InternshipId = internship.InternshipId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (model.questionTwo != null)
        //            {
        //                context.InternshipQuestions.Add(new InternshipQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionTwo,
        //                    InternshipId = internship.InternshipId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (model.questionThree != null)
        //            {
        //                context.InternshipQuestions.Add(new InternshipQuestion()
        //                {
        //                    IsActive = 1,
        //                    Question = model.questionThree,
        //                    InternshipId = internship.InternshipId
        //                });
        //                hasQuestions = true;
        //            }
        //            if (hasQuestions)
        //            {
        //                updated += context.SaveChanges();
        //            }
        //            return updated;
        //        }
        //    }
        //}

        //public static bool DeleteInternship(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var internship = context.Internships.FirstOrDefault(x => x.InternshipId == id);
        //        if (internship != null)
        //        {
        //            internship.IsActicve = 2;
        //            int deleted = context.SaveChanges();
        //            return deleted > 0;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //}

        //public static int ApplyJob(JobAnswerModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int saved = 0;

        //        context.JobApplications.Add(new JobApplication()
        //        {
        //            ApplyDate = DateTime.Now,
        //            JobId = model.jobId,
        //            Status = ApplyStatus.Pending,
        //            UserId = model.userId,
        //        });

        //        saved = context.SaveChanges();

        //        var questions = context.JobQuestions.Where(x => x.JobId == model.jobId).ToList();
        //        if (questions != null)
        //        {
        //            for (int i = 0; i < questions.Count; i++)
        //            {
        //                if (i == 0)
        //                {
        //                    context.JobAnswers.Add(new JobAnswer()
        //                    {
        //                        AnswerText = model.answerOne,
        //                        IsActive = 1,
        //                        JobQuestionId = questions[i].JobQuestionId,
        //                        UserId = model.userId,
        //                        JobId = model.jobId
        //                    });
        //                }
        //                if (i == 1)
        //                {
        //                    context.JobAnswers.Add(new JobAnswer()
        //                    {
        //                        AnswerText = model.answerTwo,
        //                        IsActive = 1,
        //                        JobQuestionId = questions[i].JobQuestionId,
        //                        UserId = model.userId,
        //                        JobId = model.jobId
        //                    });
        //                }
        //                if (i == 2)
        //                {
        //                    context.JobAnswers.Add(new JobAnswer()
        //                    {
        //                        AnswerText = model.answerThree,
        //                        IsActive = 1,
        //                        JobQuestionId = questions[i].JobQuestionId,
        //                        UserId = model.userId,
        //                        JobId = model.jobId
        //                    });
        //                }
        //            }
        //        }
        //        saved += context.SaveChanges();
        //        return saved;
        //    }
        //}

        //public static List<JobApplicationResponse> GetAppliedJobs(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<JobApplicationResponse> jobApplications = new List<JobApplicationResponse>();
        //        var appliedjobs = context.JobApplications.Where(x => x.UserId == id).ToList();
        //        if (appliedjobs != null)
        //        {
        //            foreach (var item in appliedjobs)
        //            {
        //                JobApplicationResponse jobApplication = new JobApplicationResponse();
        //                jobApplication.jobDetails = GetJobInfo(item.JobId);
        //                jobApplication.applyDate = item.ApplyDate;
        //                var answers = context.JobAnswers.Where(x => x.JobId == item.JobId).ToList();
        //                if (answers != null)
        //                {
        //                    if (answers.Count >= 1)
        //                    {
        //                        jobApplication.answerOne = answers[0].AnswerText;
        //                    }
        //                    if (answers.Count >= 2)
        //                    {
        //                        jobApplication.answerTwo = answers[1].AnswerText;
        //                    }
        //                    if (answers.Count == 3)
        //                    {
        //                        jobApplication.answerThree = answers[2].AnswerText;
        //                    }
        //                }
        //                jobApplications.Add(jobApplication);
        //            }
        //            return jobApplications;
        //        }
        //        else
        //        {
        //            return jobApplications;
        //        }
        //    }
        //}

        //public static List<InternshipApplicationResponse> GetAppliedInternships(int id)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<InternshipApplicationResponse> internApplications = new List<InternshipApplicationResponse>();
        //        var appliedinternships = context.InternshipApplications.Where(x => x.UserId == id).ToList();
        //        if (appliedinternships != null)
        //        {
        //            foreach (var item in appliedinternships)
        //            {
        //                InternshipApplicationResponse internApplication = new InternshipApplicationResponse();
        //                internApplication.internDetails = GetInternshipInfo(item.InternshipId);
        //                internApplication.applyDate = item.ApplyDate;
        //                var answers = context.InternshipAnswers.Where(x => x.InternshipId == item.InternshipId).ToList();
        //                if (answers != null)
        //                {
        //                    if (answers.Count >= 1)
        //                    {
        //                        internApplication.answerOne = answers[0].AnswerText;
        //                    }
        //                    if (answers.Count >= 2)
        //                    {
        //                        internApplication.answerTwo = answers[1].AnswerText;
        //                    }
        //                    if (answers.Count == 3)
        //                    {
        //                        internApplication.answerThree = answers[2].AnswerText;
        //                    }
        //                }
        //                internApplications.Add(internApplication);
        //            }
        //            return internApplications;
        //        }
        //        else
        //        {
        //            return internApplications;
        //        }
        //    }
        //}

        //public static JobApplicationModel getApplicationInfo(int userId, int jobId)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        JobApplication jobapplication = context.JobApplications.FirstOrDefault(x => x.UserId == userId && x.JobId == jobId);
        //        return new JobApplicationModel()
        //        {
        //            userId = userId,
        //            jobId = jobId,
        //            applyDate = jobapplication.ApplyDate,
        //            jobApplicationId = jobapplication.JobApplicationId,
        //            status = jobapplication.Status,
        //            message = jobapplication.Message
        //        };
        //    }
        //}

        //public static List<StudentJobApplicationModel> GetAppliedStudents(int jobId = 0, int internshipId = 0)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<StudentJobApplicationModel> appliedStudents = new List<StudentJobApplicationModel>();
        //        if (jobId != 0)
        //        {
        //            var appliedUserIds = context.JobApplications.Where(x => x.JobId == jobId).Select(x => x.UserId).ToList();
        //            foreach (var item in appliedUserIds)
        //            {
        //                if (context.Students.Any(x => x.UserId == item))
        //                {
        //                    StudentJobApplicationModel studentApplication = new StudentJobApplicationModel();
        //                    studentApplication.studentInfo = StudentBusiness.GetStudentInfo(item);
        //                    studentApplication.applicationInfo = getApplicationInfo(item, jobId);
        //                    appliedStudents.Add(studentApplication);
        //                }
        //            }
        //            return appliedStudents;
        //        }
        //        else if (internshipId != 0)
        //        {
        //            var appliedUserIds = context.InternshipApplications.Where(x => x.InternshipId == internshipId).Select(x => x.UserId).ToList();
        //            foreach (var item in appliedUserIds)
        //            {
        //                if (context.Students.Any(x => x.UserId == item))
        //                {
        //                    StudentJobApplicationModel studentApplication = new StudentJobApplicationModel();
        //                    studentApplication.studentInfo = StudentBusiness.GetStudentInfo(item);
        //                    studentApplication.applicationInfo = getApplicationInfo(item, jobId);
        //                    appliedStudents.Add(studentApplication);
        //                }
        //            }
        //            return appliedStudents;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        //public static List<EmployeeJobApplicationModel> GetAppliedEmployees(int jobId = 0, int internshipId = 0)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        List<EmployeeJobApplicationModel> appliedEmployees = new List<EmployeeJobApplicationModel>();
        //        if (jobId != 0)
        //        {
        //            var appliedUserIds = context.JobApplications.Where(x => x.JobId == jobId).Select(x => x.UserId).ToList();
        //            foreach (var item in appliedUserIds)
        //            {
        //                if (context.Employees.Any(x => x.UserId == item))
        //                {
        //                    EmployeeJobApplicationModel employeeApplication = new EmployeeJobApplicationModel();
        //                    employeeApplication.employeeInfo = EmployeeBusiness.GetEmployeeInfo(item);
        //                    employeeApplication.applicationInfo = getApplicationInfo(item, jobId);
        //                    appliedEmployees.Add(employeeApplication);
        //                }
        //            }
        //            return appliedEmployees;
        //        }
        //        else if (internshipId != 0)
        //        {
        //            var appliedUserIds = context.InternshipApplications.Where(x => x.InternshipId == internshipId).Select(x => x.UserId).ToList();
        //            foreach (var item in appliedUserIds)
        //            {
        //                if (context.Employees.Any(x => x.UserId == item))
        //                {
        //                    EmployeeJobApplicationModel employeeApplication = new EmployeeJobApplicationModel();
        //                    employeeApplication.employeeInfo = EmployeeBusiness.GetEmployeeInfo(item);
        //                    employeeApplication.applicationInfo = getApplicationInfo(item, jobId);
        //                    appliedEmployees.Add(employeeApplication);
        //                }
        //            }
        //            return appliedEmployees;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}

        //public static Byte[] GetStudentResumeDetails(int studentId, ref String fileName)
        //{
        //    var folderPath = CommonFunctions.GetConfigValue("studentFilePath");
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var doc = context.StudentDocuments.FirstOrDefault(x => x.StudentId == studentId && x.DocumentType == StudentDocumentTypes.Resume);
        //        if (doc != null && !string.IsNullOrWhiteSpace(doc.DocumentNameOnDisk) && !string.IsNullOrWhiteSpace(doc.DocumentName))
        //        {
        //            var fullFilePath = folderPath + doc.DocumentNameOnDisk;
        //            if (File.Exists(fullFilePath))
        //            {
        //                fileName = doc.DocumentName;
        //                return File.ReadAllBytes(fullFilePath);
        //            }
        //        }
        //    };
        //    return null;
        //}

        //public static Byte[] GetEmployeeResumeDetails(int employeeId, ref String fileName)
        //{
        //    var folderPath = CommonFunctions.GetConfigValue("employeeResumePath");
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var doc = context.EmployeeDocuments.FirstOrDefault(x => x.EmployeeId == employeeId && x.DocumentType == EmployeeDocumentTypes.Resume);
        //        if (doc != null && !string.IsNullOrWhiteSpace(doc.DocumentNameOnDisk) && !string.IsNullOrWhiteSpace(doc.DocumentName))
        //        {
        //            var fullFilePath = folderPath + doc.DocumentNameOnDisk;
        //            if (File.Exists(fullFilePath))
        //            {
        //                fileName = doc.DocumentName;
        //                return File.ReadAllBytes(fullFilePath);
        //            }
        //        }
        //    };
        //    return null;
        //}

        //public static int SaveApplicantResponse(int forStudent, int forReject, int id, int jobId)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        var jobApplication = context.JobApplications.FirstOrDefault(x => x.UserId == id && x.JobId == jobId);
        //        if (forReject == 1)
        //        {
        //            jobApplication.Status = ApplyStatus.Rejected;
        //        }
        //        else
        //        {
        //            jobApplication.Status = ApplyStatus.Approved;
        //        }
        //        return context.SaveChanges();
        //    }
        //}

        //public static int ApplyInternship(InternshipAnswerModel model)
        //{
        //    using (var context = new MakeMyJobsEntities())
        //    {
        //        int saved = 0;

        //        context.InternshipApplications.Add(new InternshipApplication()
        //        {
        //            ApplyDate = DateTime.Now,
        //            InternshipId = model.internshipId,
        //            Status = ApplyStatus.Pending,
        //            UserId = model.userId,
        //        });

        //        saved = context.SaveChanges();

        //        var questions = context.InternshipQuestions.Where(x => x.InternshipId == model.internshipId).ToList();
        //        if (questions != null)
        //        {
        //            for (int i = 0; i < questions.Count; i++)
        //            {
        //                if (i == 0)
        //                {
        //                    context.InternshipAnswers.Add(new InternshipAnswer()
        //                    {
        //                        AnswerText = model.answerOne,
        //                        IsActive = 1,
        //                        InternQuestionId = questions[i].InternQuestionId,
        //                        UserId = model.userId,
        //                        InternshipId = model.internshipId
        //                    });
        //                }
        //                if (i == 1)
        //                {
        //                    context.InternshipAnswers.Add(new InternshipAnswer()
        //                    {
        //                        AnswerText = model.answerTwo,
        //                        IsActive = 1,
        //                        InternQuestionId = questions[i].InternQuestionId,
        //                        UserId = model.userId,
        //                        InternshipId = model.internshipId
        //                    });
        //                }
        //                if (i == 2)
        //                {
        //                    context.InternshipAnswers.Add(new InternshipAnswer()
        //                    {
        //                        AnswerText = model.answerThree,
        //                        IsActive = 1,
        //                        InternQuestionId = questions[i].InternQuestionId,
        //                        UserId = model.userId,
        //                        InternshipId = model.internshipId
        //                    });
        //                }
        //            }
        //        }
        //        saved += context.SaveChanges();
        //        return saved;
        //    }
        //}
    }
}