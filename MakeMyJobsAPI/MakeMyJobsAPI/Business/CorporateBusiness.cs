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
        public static List<JobResponseModel> GetJobs(PostFilterModel model,ref int count)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<JobResponseModel> jobs = context.Posts.Where(x => x.IsActive == 1 && x.PostType == PostType.Job).Select(x => new JobResponseModel()
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
                    expiryDate = x.ExpiryDate,
                    LastUpdatedOn = x.LastUpdatedOn,
                    postedOn = x.PostedOn
                }).ToList();

                var appliedPostIds = context.PostApplications.Where(x => x.UserId == model.userId).Select(x => x.PostId).ToList();

                foreach (var item in jobs)
                {
                    item.totalApplications = context.PostApplications.Where(x => x.PostId == item.jobId).ToList().Count;

                    if (appliedPostIds != null)
                    {
                        if (appliedPostIds.IndexOf(item.jobId) >= 0)
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

                if(model.postedBy != 0)
                {
                    jobs = jobs.Where(x => x.userId == model.postedBy).ToList();
                }
                if(model.skill != 0)
                {
                    jobs = jobs.Where(x => x.skills.Select(item => item.value).ToList().IndexOf(model.skill) > -1).ToList();
                }
                if (model.tag != 0)
                {
                    jobs = jobs.Where(x => x.tags.Select(item => item.value).ToList().IndexOf(model.tag) > -1).ToList();
                }
                if (model.city != 0)
                {
                    jobs = jobs.Where(x => x.locations.Select(item => item.value).ToList().IndexOf(model.city) > -1).ToList();
                }
                if (model.searchKeyword != null)
                {
                    model.searchKeyword = model.searchKeyword.Trim();
                    jobs = jobs.Where(x => x.description.ToLower().Contains(model.searchKeyword.ToLower()) || x.jobTitle.ToLower().Contains(model.searchKeyword) || x.tagNames.ToLower().Contains(model.searchKeyword.ToLower())).ToList();
                }

                if(model.salaryOptions != null)
                {
                    List<JobResponseModel> filteredJobs = new List<JobResponseModel>();
                    var allSalaryOptions = CommonBusiness.GetSalaryDivision();
                    foreach (var item in model.salaryOptions)
                    {
                        int minBound = 0;
                        int maxBound = Int32.MaxValue;
                        var salaryName = allSalaryOptions.FirstOrDefault(x => x.value == item).text;
                        if (salaryName.ToLower().Contains("Above".ToLower()))
                        {
                            int.TryParse(salaryName.Split(' ')[1], out minBound);
                            minBound *= 100000;
                        }
                        else
                        {
                            int.TryParse(salaryName.Split(' ')[0], out minBound);
                            int.TryParse(salaryName.Split(' ')[2], out maxBound);
                            minBound *= 100000;
                            maxBound *= 100000;
                        }
                        foreach (var job in jobs)
                        {
                            if(job.minSalary >= minBound && job.minSalary <= maxBound && job.maxSalary <= maxBound)
                            {
                                filteredJobs.Add(job);
                            }
                        }
                        //jobs = jobs.Where(x => x.minSalary >= minBound && x.minSalary <= maxBound && x.maxSalary <= maxBound).ToList();
                    }
                    count = filteredJobs.Count;
                    return AddPaginationToJob(filteredJobs, model);
                }
                else
                {
                    count = jobs.Count;
                    return AddPaginationToJob(jobs, model);
                }
            }
        }

        public static List<JobResponseModel> AddPaginationToJob(List<JobResponseModel> posts, PostFilterModel model)
        {
            int recordsPerPage = FilterConstants.RecordsPerPage, totalRecords = posts.Count;
            int totalPages = totalRecords % recordsPerPage == 0 ? totalRecords / recordsPerPage - 1: totalRecords / recordsPerPage;
            if(model.page < 0 || model.page > totalPages)
            {
                model.page = 0;
            }
            int startIndex = model.page * recordsPerPage;
            List<JobResponseModel> filteredJobs = new List<JobResponseModel>();
            for (int i = startIndex; i < startIndex + recordsPerPage; i++)
            {
                if (i < totalRecords)
                {
                    filteredJobs.Add(posts[i]);
                }
            }
            return filteredJobs;
        }

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
                    ExpiryDate = model.expiryDate,
                    PostType = PostType.Job
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

        public static int UpdateJob(JobModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int updated = 0;
                Post job = context.Posts.FirstOrDefault(x => x.PostId == model.jobId);
                if (job == null)
                {
                    return updated;
                }
                else
                {
                    job.Title = model.jobTitle;
                    job.Description = model.description;
                    job.MaxSalary = model.maxSalary;
                    job.MinSalary = model.minSalary;
                    job.MinExperience = model.experience;
                    job.PostsAvailable = model.postsAvailable;
                    job.PostedOn = DateTime.UtcNow;
                    job.LastUpdatedOn = DateTime.UtcNow;
                    job.ExpiryDate = model.expiryDate;
                    updated += context.SaveChanges();


                    var prevLocations = context.PostCities.Where(x => x.PostId == model.jobId).ToList();
                    foreach (var item in prevLocations)
                    {
                        context.PostCities.Remove(item);
                    }
                    int deleted = context.SaveChanges();

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
                        updated += context.SaveChanges();
                    }

                    var prevTags = context.PostTags.Where(x => x.PostId == model.jobId).ToList();
                    foreach (var item in prevTags)
                    {
                        context.PostTags.Remove(item);
                    }
                    context.SaveChanges();

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
                        updated += context.SaveChanges();
                    }

                    var prevSkills = context.PostSkills.Where(x => x.PostId == model.jobId).ToList();
                    foreach (var item in prevSkills)
                    {
                        context.PostSkills.Remove(item);
                    }
                    context.SaveChanges();

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
                        updated += context.SaveChanges();
                    }

                    //var questions = context.PostQuestions.Where(x => x.PostId == model.jobId).ToList();
                    //foreach (var item in questions)
                    //{
                    //    context.Entry(item).State = System.Data.Entity.EntityState.Deleted;
                    //}
                    //updated += context.SaveChanges();

                    //bool hasQuestions = false;
                    //if (model.questionOne != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionOne,
                    //        PostId = job.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (model.questionTwo != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionTwo,
                    //        PostId = job.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (model.questionThree != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionThree,
                    //        PostId = job.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (hasQuestions)
                    //{
                    //    updated += context.SaveChanges();
                    //}
                    return updated;
                }
            }
        }

        public static JobResponseModel GetJobInfo(int id, int userId = 0)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var job = context.Posts.FirstOrDefault(x => x.PostId == id && x.IsActive == 1);
                JobResponseModel jobResponse = new JobResponseModel()
                {
                    jobId = job.PostId,
                    jobTitle = job.Title,
                    description = job.Description,
                    experience = job.MinExperience ?? 0,
                    IsActive = job.IsActive,
                    minSalary = job.MinSalary ?? 0,
                    maxSalary = job.MaxSalary,
                    postsAvailable = job.PostsAvailable,
                    userId = job.UserId,
                    expiryDate = job.ExpiryDate,
                    LastUpdatedOn = job.LastUpdatedOn,
                    postedOn = job.PostedOn
                };

                var corporate = context.Corporates.FirstOrDefault(x => x.UserId == jobResponse.userId);
                jobResponse.companyName = corporate.CompanyName;
                jobResponse.companyInfo = corporate.CompanyInfo;

                var checkApplication = context.PostApplications.FirstOrDefault(x => x.UserId == userId && x.PostId == jobResponse.jobId);
                if (checkApplication != null)
                {
                    jobResponse.message = checkApplication.Message;
                    jobResponse.applied = true;
                }

                jobResponse.locations = context.PostCities.Join(context.Cities, jc => jc.CityId, c => c.CityId, (jc, c) => new
                {
                    cityId = jc.CityId,
                    cityName = c.CityName,
                    jobId = jc.PostId
                }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
                {
                    value = x.cityId,
                    text = x.cityName
                }).ToList();

                foreach (var city in jobResponse.locations)
                {
                    jobResponse.locationNames += city.text + ", ";
                }
                if (jobResponse.locationNames != null)
                {
                    jobResponse.locationNames = jobResponse.locationNames.Substring(0, jobResponse.locationNames.Length - 2);
                }

                jobResponse.tags = context.PostTags.Join(context.Tags, jt => jt.TagId, t => t.TagId, (jt, t) => new
                {
                    tagId = jt.TagId,
                    tagName = t.TagName,
                    jobId = jt.PostId
                }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
                {
                    value = x.tagId,
                    text = x.tagName
                }).ToList();

                foreach (var item in jobResponse.tags)
                {
                    jobResponse.tagNames += item.text + ", ";
                }
                if (jobResponse.tagNames != null)
                {
                    jobResponse.tagNames = jobResponse.tagNames.Substring(0, jobResponse.tagNames.Length - 2);
                }

                jobResponse.skills = context.PostSkills.Join(context.Skills, js => js.SkillId, s => s.SkillId, (jt, t) => new
                {
                    skillId = jt.SkillId,
                    skillName = t.SkillName,
                    jobId = jt.PostId
                }).Where(x => x.jobId == jobResponse.jobId).Select(x => new DropdownModel()
                {
                    value = x.skillId,
                    text = x.skillName
                }).ToList();

                foreach (var item in jobResponse.skills)
                {
                    jobResponse.skillNames += item.text + ", ";
                }
                if (jobResponse.skillNames != null)
                {
                    jobResponse.skillNames = jobResponse.skillNames.Substring(0, jobResponse.skillNames.Length - 2);
                }

                List<String> questions = context.PostQuestions.Join(context.Posts, jq => jq.PostId, j => j.PostId, (jq, j) => new
                {
                    jobId = j.PostId,
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

        public static List<JobResponseModel> GetJobsByUser(int id, bool requestFromHome = false)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<JobResponseModel> jobs = context.Posts.Where(x => x.UserId == id && x.IsActive == 1).Select(x => new JobResponseModel()
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
                    expiryDate = x.ExpiryDate,
                    LastUpdatedOn = x.LastUpdatedOn,
                    postedOn = x.PostedOn
                }).ToList();

                //if (!requestFromHome)
                //{
                //    jobs = jobs.Take(4).ToList();
                //}

                foreach (var item in jobs)
                {
                    item.totalApplications = context.PostApplications.Where(x => x.PostId == item.jobId).ToList().Count;

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

        public static List<InternshipResponseModel> GetInternships(PostFilterModel model,ref int count)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<InternshipResponseModel> internships = context.Posts.Where(x => x.IsActive == 1 && x.PostType == PostType.Internship).Select(x => new InternshipResponseModel()
                {
                    internshipId = x.PostId,
                    userId = x.UserId,
                    title = x.Title,
                    description = x.Description,
                    isActicve = x.IsActive,
                    expiryDate = x.ExpiryDate,
                    isPartTimeAvailable = x.IsPartTimeAvailable ?? 0,
                    isWFHAvailable = x.IsWFHAvailable ?? 0,
                    jobOffer = x.JobOffer ?? 0,
                    minStipend = x.MinSalary ?? 0,
                    maxStipend = x.MaxSalary,
                    postedOn = x.PostedOn,
                    lastUpdatedOn = x.LastUpdatedOn,
                    postsAvailable = x.PostsAvailable,
                    startDate = x.StartDate
                }).ToList();

                var appliedPostIds = context.PostApplications.Where(x => x.UserId == model.userId).Select(x => x.PostId).ToList();

                foreach (var item in internships)
                {
                    item.totalApplications = context.PostApplications.Where(x => x.PostId == item.internshipId).ToList().Count;
                    if (appliedPostIds != null)
                    {
                        if (appliedPostIds.IndexOf(item.internshipId) >= 0)
                        {
                            item.applied = true;
                        }
                    }
                    item.locations = context.PostCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
                    {
                        cityId = ic.CityId,
                        cityName = c.CityName,
                        PostId = ic.PostId
                    }).Where(x => x.PostId == item.internshipId).Select(x => new DropdownModel()
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

                    item.skills = context.PostSkills.Join(context.Skills, ic => ic.SkillId, s => s.SkillId, (ic, s) => new
                    {
                        skillId = ic.SkillId,
                        skillName = s.SkillName,
                        PostId = ic.PostId
                    }).Where(x => x.PostId == item.internshipId).Select(x => new DropdownModel()
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

                    item.tags = context.PostTags.Join(context.Tags, it => it.TagId, t => t.TagId, (it, t) => new
                    {
                        tagId = it.TagId,
                        tagName = t.TagName,
                        PostId = it.PostId
                    }).Where(x => x.PostId == item.internshipId).Select(x => new DropdownModel()
                    {
                        value = x.tagId,
                        text = x.tagName
                    }).ToList();

                    foreach (var city in item.tags)
                    {
                        item.tagNames += city.text + ", ";
                    }
                    if (item.tagNames != null)
                    {
                        item.tagNames = item.tagNames.Substring(0, item.tagNames.Length - 2);
                    }

                    List<String> questions = context.PostQuestions.Join(context.Posts, iq => iq.PostId, i => i.PostId, (iq, i) => new
                    {
                        PostId = i.PostId,
                        question = iq.Question
                    }).Where(x => x.PostId == item.internshipId).Select(x => x.question).ToList();
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

                if(model.postedBy != 0)
                {
                    internships = internships.Where(x => x.userId == model.postedBy).ToList();
                }
                if (model.skill != 0)
                {
                    internships = internships.Where(x => x.skills.Select(item => item.value).ToList().IndexOf(model.skill) > -1).ToList();
                }
                if (model.tag != 0)
                {
                    internships = internships.Where(x => x.tags.Select(item => item.value).ToList().IndexOf(model.tag) > -1).ToList();
                }
                if (model.city != 0)
                {
                    internships = internships.Where(x => x.locations.Select(item => item.value).ToList().IndexOf(model.city) > -1).ToList();
                }
                if (model.isWFHAvailable)
                {
                    internships = internships.Where(x => x.isWFHAvailable == 1).ToList();
                }
                if (model.isPartTimeAvailable)
                {
                    internships = internships.Where(x => x.isPartTimeAvailable == 1).ToList();
                }
                if (model.jobOffer)
                {
                    internships = internships.Where(x => x.jobOffer == 1).ToList();
                }
                if(model.minStipend != 0)
                {
                    internships = internships.Where(x => x.minStipend >= model.minStipend).ToList();
                }
                if(model.startDate != null)
                {
                    internships = internships.Where(x => x.startDate >= model.startDate).ToList();
                }
                if(model.searchKeyword != null)
                {
                    model.searchKeyword = model.searchKeyword.Trim();
                    internships = internships.Where(x => x.description.ToLower().Contains(model.searchKeyword.ToLower()) || x.title.ToLower().Contains(model.searchKeyword) || x.tagNames.ToLower().Contains(model.searchKeyword.ToLower())).ToList();
                }

                count = internships.Count;
                return AddPaginationToInternship(internships, model);
            }
        }

        public static List<InternshipResponseModel> AddPaginationToInternship(List<InternshipResponseModel> posts, PostFilterModel model)
        {
            int recordsPerPage = FilterConstants.RecordsPerPage, totalRecords = posts.Count;
            int totalPages = totalRecords % recordsPerPage == 0 ? totalRecords / recordsPerPage - 1 : totalRecords / recordsPerPage;
            if (model.page < 0 || model.page > totalPages)
            {
                model.page = 0;
            }
            int startIndex = model.page * recordsPerPage;
            List<InternshipResponseModel> filteredPosts = new List<InternshipResponseModel>();
            for (int i = startIndex; i < startIndex + recordsPerPage; i++)
            {
                if (i < totalRecords)
                {
                    filteredPosts.Add(posts[i]);
                }
            }
            return filteredPosts;
        }

        public static InternshipResponseModel GetInternshipInfo(int id, int userId = 0)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var post = context.Posts.FirstOrDefault(x => x.PostId == id && x.IsActive == 1);
                InternshipResponseModel postResponse = new InternshipResponseModel()
                {
                    internshipId = post.PostId,
                    userId = post.UserId,
                    title = post.Title,
                    description = post.Description,
                    isActicve = post.IsActive,
                    expiryDate = post.ExpiryDate,
                    isPartTimeAvailable = post.IsPartTimeAvailable ?? 0,
                    isWFHAvailable = post.IsWFHAvailable ?? 0,
                    jobOffer = post.JobOffer ?? 0,
                    minStipend = post.MinSalary ?? 0,
                    maxStipend = post.MaxSalary ?? 0,
                    postedOn = post.PostedOn,
                    lastUpdatedOn = post.LastUpdatedOn,
                    postsAvailable = post.PostsAvailable,
                    startDate = post.StartDate
                };

                var corporate = context.Corporates.FirstOrDefault(x => x.UserId == postResponse.userId);
                postResponse.companyName = corporate.CompanyName;
                postResponse.companyInfo = corporate.CompanyInfo;

                var checkApplication = context.PostApplications.FirstOrDefault(x => x.UserId == userId && x.PostId == id);
                if (checkApplication != null)
                {
                    postResponse.message = checkApplication.Message;
                    postResponse.applied = true;
                }

                postResponse.locations = context.PostCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
                {
                    cityId = ic.CityId,
                    cityName = c.CityName,
                    PostId = ic.PostId
                }).Where(x => x.PostId == postResponse.internshipId).Select(x => new DropdownModel()
                {
                    value = x.cityId,
                    text = x.cityName
                }).ToList();

                foreach (var city in postResponse.locations)
                {
                    postResponse.locationNames += city.text + ", ";
                }
                if (postResponse.locationNames != null)
                {
                    postResponse.locationNames = postResponse.locationNames.Substring(0, postResponse.locationNames.Length - 2);
                }

                postResponse.skills = context.PostSkills.Join(context.Skills, ic => ic.SkillId, s => s.SkillId, (ic, s) => new
                {
                    skillId = ic.SkillId,
                    skillName = s.SkillName,
                    PostId = ic.PostId
                }).Where(x => x.PostId == postResponse.internshipId).Select(x => new DropdownModel()
                {
                    value = x.skillId,
                    text = x.skillName
                }).ToList();

                foreach (var skill in postResponse.skills)
                {
                    postResponse.skillNames += skill.text + ", ";
                }
                if (postResponse.skillNames != null)
                {
                    postResponse.skillNames = postResponse.skillNames.Substring(0, postResponse.skillNames.Length - 2);
                }

                postResponse.tags = context.PostTags.Join(context.Tags, it => it.TagId, t => t.TagId, (it, t) => new
                {
                    tagId = it.TagId,
                    tagName = t.TagName,
                    PostId = it.PostId
                }).Where(x => x.PostId == postResponse.internshipId).Select(x => new DropdownModel()
                {
                    value = x.tagId,
                    text = x.tagName
                }).ToList();

                foreach (var city in postResponse.tags)
                {
                    postResponse.tagNames += city.text + ", ";
                }
                if (postResponse.tagNames != null)
                {
                    postResponse.tagNames = postResponse.tagNames.Substring(0, postResponse.tagNames.Length - 2);
                }


                List<String> questions = context.PostQuestions.Join(context.Posts, iq => iq.PostId, i => i.PostId, (iq, i) => new
                {
                    PostId = i.PostId,
                    question = iq.Question
                }).Where(x => x.PostId == postResponse.internshipId).Select(x => x.question).ToList();
                if (questions != null)
                {
                    if (questions.Count == 1)
                    {
                        postResponse.questionOne = questions[0];
                    }
                    if (questions.Count == 2)
                    {
                        postResponse.questionOne = questions[0];
                        postResponse.questionTwo = questions[1];
                    }
                    if (questions.Count == 3)
                    {
                        postResponse.questionOne = questions[0];
                        postResponse.questionTwo = questions[1];
                        postResponse.questionThree = questions[2];
                    }
                }
                return postResponse;
            }
        }

        public static int UpdateInternship(InternshipModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int updated = 0;
                Post internship = context.Posts.FirstOrDefault(x => x.PostId == model.internshipId);
                if (internship == null)
                {
                    return updated;
                }
                else
                {
                    internship.Title = model.title;
                    internship.Description = model.description;
                    internship.MaxSalary = model.maxStipend;
                    internship.MinSalary = model.minStipend;
                    internship.PostsAvailable = model.postsAvailable;
                    internship.StartDate = model.startDate;
                    internship.IsPartTimeAvailable = model.isPartTimeAvailable ? 1 : 0;
                    internship.IsWFHAvailable = model.isWFHAvailable ? 1 : 0;
                    internship.JobOffer = model.jobOffer ? 1 : 0;
                    internship.PostedOn = DateTime.Now;
                    internship.LastUpdatedOn = DateTime.Now;
                    internship.ExpiryDate = model.expiryDate;
                    updated += context.SaveChanges();

                    var prevLocations = context.PostCities.Where(x => x.PostId == model.internshipId).ToList();
                    foreach (var item in prevLocations)
                    {
                        context.PostCities.Remove(item);
                    }
                    int deleted = context.SaveChanges();

                    if (model.locations != null)
                    {
                        foreach (var item in model.locations)
                        {
                            context.PostCities.Add(new PostCity()
                            {
                                PostId = internship.PostId,
                                CityId = item.value
                            });
                        }
                        updated += context.SaveChanges();
                    }

                    var prevSkills = context.PostSkills.Where(x => x.PostId == model.internshipId).ToList();
                    foreach (var item in prevSkills)
                    {
                        context.PostSkills.Remove(item);
                    }
                    context.SaveChanges();

                    if (model.skills != null)
                    {
                        foreach (var item in model.skills)
                        {
                            context.PostSkills.Add(new PostSkill()
                            {
                                PostId = internship.PostId,
                                SkillId = item.value
                            });
                        }
                        updated += context.SaveChanges();
                    }

                    var prevTags = context.PostTags.Where(x => x.PostId == model.internshipId).ToList();
                    foreach (var item in prevTags)
                    {
                        context.PostTags.Remove(item);
                    }
                    context.SaveChanges();

                    if (model.tags != null)
                    {
                        foreach (var item in model.tags)
                        {
                            context.PostTags.Add(new PostTag()
                            {
                                PostId = internship.PostId,
                                TagId = item.value
                            });
                        }
                        updated += context.SaveChanges();
                    }

                    //var questions = context.PostQuestions.Where(x => x.PostId == model.internshipId).ToList();
                    //foreach (var item in questions)
                    //{
                    //    context.Entry(item).State = System.Data.Entity.EntityState.Deleted;
                    //}
                    //updated += context.SaveChanges();

                    //bool hasQuestions = false;
                    //if (model.questionOne != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionOne,
                    //        PostId = internship.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (model.questionTwo != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionTwo,
                    //        PostId = internship.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (model.questionThree != null)
                    //{
                    //    context.PostQuestions.Add(new PostQuestion()
                    //    {
                    //        Question = model.questionThree,
                    //        PostId = internship.PostId
                    //    });
                    //    hasQuestions = true;
                    //}
                    //if (hasQuestions)
                    //{
                    //    updated += context.SaveChanges();
                    //}
                    return updated;
                }
            }
        }

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

                    int count = 0;
                    corporateInfoModel.corporateJobs = CorporateBusiness.GetJobs(new PostFilterModel() { userId = corporateInfoModel.userId }, ref count);
                    corporateInfoModel.corporateInternships = CorporateBusiness.GetInternships(new PostFilterModel() { userId = corporateInfoModel.userId }, ref count);

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
                return GetUpdatedCorporateInfo(user.UserId, corporate.CorporateId);
            }
        }

        public static int SaveLogo(int corporateId, String fileName, String fileNameOnDisk, long fileSize)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var previousLogo = context.CorporateDocuments.FirstOrDefault(x => x.CorporateId == corporateId && x.DocumentType == 1);
                if (previousLogo != null)
                {
                    context.Entry(previousLogo).State = System.Data.Entity.EntityState.Deleted;
                }
                else
                {
                    context.CorporateDocuments.Add(new CorporateDocument()
                    {
                        DocumentName = fileName,
                        DocumentNameOnDisk = fileNameOnDisk,
                        DocumentSize = fileSize,
                        DocumentType = 1,
                        IsActive = 1,
                        LastUpdatedOn = DateTime.Now,
                        CorporateId = corporateId
                    });
                }
                return context.SaveChanges();
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

        public static int CreatePost(PostModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int postAdded = 0;
                Post post = new Post();
                if (model.postType == PostType.Internship)
                {
                    post.UserId = model.userId;
                    post.Title = model.title;
                    post.Description = model.description;
                    post.IsActive = 1;
                    post.ExpiryDate = model.expiryDate;
                    post.IsPartTimeAvailable = model.isPartTimeAvailable ? 1 : 0;
                    post.IsWFHAvailable = model.isWFHAvailable ? 1 : 0;
                    post.JobOffer = model.jobOffer ? 1 : 0;
                    post.MinSalary = model.minSalary;
                    post.MaxSalary = model.maxSalary;
                    post.PostedOn = DateTime.UtcNow;
                    post.LastUpdatedOn = DateTime.UtcNow;
                    post.PostsAvailable = model.postsAvailable;
                    post.StartDate = model.startDate;
                    post.PostType = model.postType;
                    context.Posts.Add(post);
                    postAdded += context.SaveChanges();
                }
                else
                {

                }
                foreach (var item in model.locations)
                {
                    context.PostCities.Add(new PostCity()
                    {
                        PostId = post.PostId,
                        CityId = item.value
                    });
                }
                postAdded += context.SaveChanges();

                foreach (var item in model.skills)
                {
                    context.PostSkills.Add(new PostSkill()
                    {
                        PostId = post.PostId,
                        SkillId = item.value
                    });
                }
                postAdded += context.SaveChanges();

                foreach (var item in model.tags)
                {
                    context.PostTags.Add(new PostTag()
                    {
                        PostId = post.PostId,
                        TagId = item.value
                    });
                }
                postAdded += context.SaveChanges();

                bool hasQuestions = false;
                if (model.questionOne != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionOne,
                        PostId = post.PostId
                    });
                    hasQuestions = true;
                }
                if (model.questionTwo != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionTwo,
                        PostId = post.PostId
                    });
                    hasQuestions = true;
                }
                if (model.questionThree != null)
                {
                    context.PostQuestions.Add(new PostQuestion()
                    {
                        Question = model.questionThree,
                        PostId = post.PostId
                    });
                    hasQuestions = true;
                }
                if (hasQuestions)
                {
                    postAdded += context.SaveChanges();
                }
                return postAdded;
            }
        }

        public static bool DeletePost(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var job = context.Posts.FirstOrDefault(x => x.PostId == id);
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

        public static int ApplyPost(PostAnswerModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int saved = 0;

                context.PostApplications.Add(new PostApplication()
                {
                    ApplyDate = DateTime.Now,
                    PostId = model.postId,
                    ApplyStatus = ApplyStatus.Pending,
                    UserId = model.userId,
                });

                saved = context.SaveChanges();

                var questions = context.PostQuestions.Where(x => x.PostId == model.postId).ToList();
                if (questions != null)
                {
                    for (int i = 0; i < questions.Count; i++)
                    {
                        if (i == 0)
                        {
                            context.PostAnswers.Add(new PostAnswer()
                            {
                                Answer = model.answerOne,
                                PostQuestionId = questions[i].PostQuestionId,
                                UserId = model.userId,
                                PostId = model.postId
                            });
                        }
                        if (i == 1)
                        {
                            context.PostAnswers.Add(new PostAnswer()
                            {
                                Answer = model.answerTwo,
                                PostQuestionId = questions[i].PostQuestionId,
                                UserId = model.userId,
                                PostId = model.postId
                            });
                        }
                        if (i == 2)
                        {
                            context.PostAnswers.Add(new PostAnswer()
                            {
                                Answer = model.answerThree,
                                PostQuestionId = questions[i].PostQuestionId,
                                UserId = model.userId,
                                PostId = model.postId
                            });
                        }
                    }
                }
                saved += context.SaveChanges();
                return saved;
            }
        }
 
        public static PostResponseModel GetPostInfo(int id, int userId = 0)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var post = context.Posts.FirstOrDefault(x => x.PostId == id && x.IsActive == 1);
                PostResponseModel postResponse = new PostResponseModel()
                {
                    postId = post.PostId,
                    userId = post.UserId,
                    title = post.Title,
                    description = post.Description,
                    isActicve = post.IsActive,
                    expiryDate = post.ExpiryDate,
                    isPartTimeAvailable = post.IsPartTimeAvailable ?? 0,
                    isWFHAvailable = post.IsWFHAvailable ?? 0,
                    jobOffer = post.JobOffer ?? 0,
                    minSalary = post.MinSalary ?? 0,
                    maxSalary = post.MaxSalary ?? 0,
                    postedOn = post.PostedOn,
                    lastUpdatedOn = post.LastUpdatedOn,
                    postsAvailable = post.PostsAvailable,
                    startDate = post.StartDate,
                    postType = post.PostType
                };

                var corporate = context.Corporates.FirstOrDefault(x => x.UserId == postResponse.userId);
                postResponse.companyName = corporate.CompanyName;
                postResponse.companyInfo = corporate.CompanyInfo;

                var checkApplication = context.PostApplications.FirstOrDefault(x => x.UserId == userId && x.PostId == id);
                if (checkApplication != null)
                {
                    postResponse.message = checkApplication.Message;
                    postResponse.applied = true;
                }

                postResponse.locations = context.PostCities.Join(context.Cities, ic => ic.CityId, c => c.CityId, (ic, c) => new
                {
                    cityId = ic.CityId,
                    cityName = c.CityName,
                    PostId = ic.PostId
                }).Where(x => x.PostId == postResponse.postId).Select(x => new DropdownModel()
                {
                    value = x.cityId,
                    text = x.cityName
                }).ToList();

                foreach (var city in postResponse.locations)
                {
                    postResponse.locationNames += city.text + ", ";
                }
                if (postResponse.locationNames != null)
                {
                    postResponse.locationNames = postResponse.locationNames.Substring(0, postResponse.locationNames.Length - 2);
                }

                postResponse.skills = context.PostSkills.Join(context.Skills, ic => ic.SkillId, s => s.SkillId, (ic, s) => new
                {
                    skillId = ic.SkillId,
                    skillName = s.SkillName,
                    PostId = ic.PostId
                }).Where(x => x.PostId == postResponse.postId).Select(x => new DropdownModel()
                {
                    value = x.skillId,
                    text = x.skillName
                }).ToList();

                foreach (var skill in postResponse.skills)
                {
                    postResponse.skillNames += skill.text + ", ";
                }
                if (postResponse.skillNames != null)
                {
                    postResponse.skillNames = postResponse.skillNames.Substring(0, postResponse.skillNames.Length - 2);
                }

                postResponse.tags = context.PostTags.Join(context.Tags, it => it.TagId, t => t.TagId, (it, t) => new
                {
                    tagId = it.TagId,
                    tagName = t.TagName,
                    PostId = it.PostId
                }).Where(x => x.PostId == postResponse.postId).Select(x => new DropdownModel()
                {
                    value = x.tagId,
                    text = x.tagName
                }).ToList();

                foreach (var city in postResponse.tags)
                {
                    postResponse.tagNames += city.text + ", ";
                }
                if (postResponse.tagNames != null)
                {
                    postResponse.tagNames = postResponse.tagNames.Substring(0, postResponse.tagNames.Length - 2);
                }


                List<String> questions = context.PostQuestions.Join(context.Posts, iq => iq.PostId, i => i.PostId, (iq, i) => new
                {
                    PostId = i.PostId,
                    question = iq.Question
                }).Where(x => x.PostId == postResponse.postId).Select(x => x.question).ToList();
                if (questions != null)
                {
                    if (questions.Count == 1)
                    {
                        postResponse.questionOne = questions[0];
                    }
                    if (questions.Count == 2)
                    {
                        postResponse.questionOne = questions[0];
                        postResponse.questionTwo = questions[1];
                    }
                    if (questions.Count == 3)
                    {
                        postResponse.questionOne = questions[0];
                        postResponse.questionTwo = questions[1];
                        postResponse.questionThree = questions[2];
                    }
                }
                return postResponse;
            }
        }

        public static List<PostApplicationResponse> GetAppliedPosts(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<PostApplicationResponse> internApplications = new List<PostApplicationResponse>();
                var appliedinternships = context.PostApplications.Where(x => x.UserId == id).ToList();
                if (appliedinternships != null)
                {
                    foreach (var item in appliedinternships)
                    {
                        PostApplicationResponse postApplication = new PostApplicationResponse();
                        postApplication.postDetails = GetPostInfo(item.PostId);
                        postApplication.applyDate = item.ApplyDate;
                        var answers = context.PostAnswers.Where(x => x.PostId == item.PostId).ToList();
                        if (answers != null)
                        {
                            if (answers.Count >= 1)
                            {
                                postApplication.answerOne = answers[0].Answer;
                            }
                            if (answers.Count >= 2)
                            {
                                postApplication.answerTwo = answers[1].Answer;
                            }
                            if (answers.Count == 3)
                            {
                                postApplication.answerThree = answers[2].Answer;
                            }
                        }
                        internApplications.Add(postApplication);
                    }
                    return internApplications;
                }
                else
                {
                    return internApplications;
                }
            }
        }

        public static PostApplicationModel getApplicationInfo(int userId, int postId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                PostApplication application = context.PostApplications.FirstOrDefault(x => x.UserId == userId && x.PostId == postId);
                return new PostApplicationModel()
                {
                    userId = userId,
                    postId = postId,
                    applyDate = application.ApplyDate,
                    postApplicationId = application.PostApplicationId,
                    status = application.ApplyStatus,
                    message = application.Message
                };
            }
        }

        public static List<StudentPostApplicationModel> GetAppliedStudents(int postId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<StudentPostApplicationModel> appliedStudents = new List<StudentPostApplicationModel>();

                var appliedUserIds = context.PostApplications.Where(x => x.PostId == postId).Select(x => x.UserId).ToList();
                foreach (var item in appliedUserIds)
                {
                    if (context.Students.Any(x => x.UserId == item))
                    {
                        StudentPostApplicationModel studentApplication = new StudentPostApplicationModel();
                        studentApplication.studentInfo = StudentBusiness.GetStudentInfo(item);
                        studentApplication.applicationInfo = getApplicationInfo(item, postId);
                        appliedStudents.Add(studentApplication);
                    }
                }
                return appliedStudents;
            }
        }

        public static List<EmployeePostApplicationModel> GetAppliedEmployees(int postId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                List<EmployeePostApplicationModel> appliedEmployees = new List<EmployeePostApplicationModel>();
                var appliedUserIds = context.PostApplications.Where(x => x.PostId == postId).Select(x => x.UserId).ToList();
                foreach (var item in appliedUserIds)
                {
                    if (context.Employees.Any(x => x.UserId == item))
                    {
                        EmployeePostApplicationModel employeeApplication = new EmployeePostApplicationModel();
                        employeeApplication.employeeInfo = EmployeeBusiness.GetEmployeeInfo(item);
                        employeeApplication.applicationInfo = getApplicationInfo(item, postId);
                        appliedEmployees.Add(employeeApplication);
                    }
                }
                return appliedEmployees;
            }
        }

        public static Byte[] GetStudentResumeDetails(int studentId, ref String fileName)
        {
            var folderPath = CommonFunctions.GetConfigValue("studentFilePath");
            using (var context = new MakeMyJobsEntities())
            {
                var doc = context.StudentDocuments.FirstOrDefault(x => x.StudentId == studentId && x.DocumentType == StudentDocumentTypes.Resume);
                if (doc != null && !string.IsNullOrWhiteSpace(doc.DocumentNameOnDisk) && !string.IsNullOrWhiteSpace(doc.DocumentName))
                {
                    var fullFilePath = folderPath + doc.DocumentNameOnDisk;
                    if (File.Exists(fullFilePath))
                    {
                        fileName = doc.DocumentName;
                        return File.ReadAllBytes(fullFilePath);
                    }
                }
            };
            return null;
        }

        public static Byte[] GetEmployeeResumeDetails(int employeeId, ref String fileName)
        {
            var folderPath = CommonFunctions.GetConfigValue("employeeResumePath");
            using (var context = new MakeMyJobsEntities())
            {
                var doc = context.EmployeeDocuments.FirstOrDefault(x => x.EmployeeId == employeeId && x.DocumentType == EmployeeDocumentTypes.Resume);
                if (doc != null && !string.IsNullOrWhiteSpace(doc.DocumentNameOnDisk) && !string.IsNullOrWhiteSpace(doc.DocumentName))
                {
                    var fullFilePath = folderPath + doc.DocumentNameOnDisk;
                    if (File.Exists(fullFilePath))
                    {
                        fileName = doc.DocumentName;
                        return File.ReadAllBytes(fullFilePath);
                    }
                }
            };
            return null;
        }

        public static int SaveApplicantResponse(int forStudent, int forReject, int id, int postId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var postApplication = context.PostApplications.FirstOrDefault(x => x.UserId == id && x.PostId == postId);
                if (forReject == 1)
                {
                    postApplication.ApplyStatus = ApplyStatus.Rejected;
                }
                else
                {
                    postApplication.ApplyStatus = ApplyStatus.Approved;
                }
                return context.SaveChanges();
            }
        }
    }
}