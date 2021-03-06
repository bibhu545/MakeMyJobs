﻿using MakeMyJobsAPI.Business;
using MakeMyJobsAPI.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Controllers
{
    public class CommonController : Controller
    {
        [HttpGet]
        public JsonResult GetStateAndCountries()
        {
            try
            {
                var states = CommonBusiness.GetStates();
                var countries = CommonBusiness.GetCountries();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { states, countries } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        [HttpGet]
        public JsonResult GetCities()
        {
            try
            {
                var cities = CommonBusiness.GetCities();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { cities } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        [HttpGet]
        public JsonResult GetCommonDataForNewPost()
        {
            try
            {
                var cities = CommonBusiness.GetCities();
                var skills = CommonBusiness.GetSkills();
                var tags = CommonBusiness.GetTags();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { cities, skills, tags } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        [HttpGet]
        public JsonResult GetCommonDataForFilters()
        {
            try
            {
                var cities = CommonBusiness.GetCities();
                var skills = CommonBusiness.GetSkills();
                var tags = CommonBusiness.GetTags();
                var salaryDivision = CommonBusiness.GetSalaryDivision();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { cities, skills, tags, salaryDivision } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}