using MakeMyJobsAPI.EDMX;
using MakeMyJobsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Business
{
    public class CommonBusiness
    {
        public static System.Web.Mvc.JsonResult GetErrorResponse(string errorMessage = "")
        {
            return new System.Web.Mvc.JsonResult
            {
                Data = new ApiRespnoseWrapper
                {
                    status = ApiRespnoseStatus.Failed,
                    errorMessage = errorMessage
                }
            };
        }
        public static List<DropdownModel> GetStates()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.States.Select(x => new DropdownModel()
                {
                    value = x.StateId,
                    text = x.StateName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetCountries()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Countries.Select(x => new DropdownModel()
                {
                    value = x.CountryId,
                    text = x.CountryName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetCities()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Cities.Select(x => new DropdownModel()
                {
                    value = x.CityId,
                    text = x.CityName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetSkills()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Skills.Select(x => new DropdownModel()
                {
                    value = x.SkillId,
                    text = x.SkillName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetTags()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Tags.Select(x => new DropdownModel()
                {
                    value = x.TagId,
                    text = x.TagName
                }).ToList();
            }
        }
        public static List<DropdownModel> GetSalaryDivision()
        {
            using (var context = new MakeMyJobsEntities())
            {
                return context.Lookups.Where(x => x.LookUpCategory == 3).Select(x => new DropdownModel()
                {
                    value = x.LookupId,
                    text = x.Name
                }).ToList();
            }
        }
    }
}