using MakeMyJobsAPI.Business;
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
    public class CorporateController : Controller
    {
        public JsonResult GetJobs()
        {
            try
            {
                var result = CorporateBusiness.GetJobs();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetInternships()
        {
            try
            {
                var result = CorporateBusiness.GetInternships();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetCorporateInfo(int id)
        {
            try
            {
                var result = CorporateBusiness.GetCorporateInfo(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetCorporateInfoForEdit(int id)
        {
            try
            {
                var result = CorporateBusiness.GetCorporateInfoForEdit(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult UpdateCorporateBasicInfo(CorporateInfoModel model)
        {
            try
            {
                var result = CorporateBusiness.UpdateCorporateBasicInfo(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult CreateJob(JobModel model)
        {
            try
            {
                var result = CorporateBusiness.CreateJob(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult CreateInternship(InternshipModel model)
        {
            try
            {
                var result = CorporateBusiness.CreateInternship(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetJobsByUser(int id,int page = 0)
        {
            try
            {
                var result = CorporateBusiness.GetJobsByUser(id, page);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetJobInfo(int id)
        {
            try
            {
                var result = CorporateBusiness.GetJobInfo(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult UpdateJob(JobModel model)
        {
            try
            {
                var result = CorporateBusiness.UpdateJob(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult UpdateInternship(InternshipModel model)
        {
            try
            {
                var result = CorporateBusiness.UpdateInternship(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult DeleteJob(int id)
        {
            try
            {
                var result = CorporateBusiness.DeleteJob(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetInternshipInfo(int id)
        {
            try
            {
                var result = CorporateBusiness.GetInternshipInfo(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult DeleteInternship(int id)
        {
            try
            {
                var result = CorporateBusiness.DeleteInternship(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}