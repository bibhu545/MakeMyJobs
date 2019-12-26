using MakeMyJobsAPI.Business;
using MakeMyJobsAPI.Models;
using MakeMyJobsAPI.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMyJobsAPI.Utils.Constants;

namespace MakeMyJobsAPI.Controllers
{
    public class CorporateController : Controller
    {
        public JsonResult GetJobs(int userId = 0, int page = 0)
        {
            try
            {
                var result = CorporateBusiness.GetJobs(userId, page);
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
                if (result != null)
                {
                    if (Request.Files.Count > 0)
                    {
                        UploadLogo(result.corporateId);
                    }
                }
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public bool UploadLogo(int corporateId)
        {
            var folderPath = CommonFunctions.GetConfigValue("logoPath");
            List<string> documentExtensions = new List<string>() { ".jpg", ".png", ".jpeg", ".ico" };
            for (int i = 0; i < Request.Files.Count; i++)
            {
                var fileName = Path.GetFileName(Request.Files[i].FileName);
                var fileExtension = Path.GetExtension(Request.Files[i].FileName).ToLower();
                var fileNameOnDisk = string.Empty;
                if (documentExtensions.IndexOf(fileExtension) < 0)
                {
                    return false;
                }
                fileNameOnDisk = fileNameOnDisk = "CTL-" + corporateId + "-" + Guid.NewGuid().ToString().Replace("-", "") + fileExtension;
                Request.Files[i].SaveAs(folderPath + fileNameOnDisk);
                if (CorporateBusiness.SaveLogo(corporateId, fileName, fileNameOnDisk, Request.Files[i].ContentLength) > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            return true;
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

        public JsonResult GetJobInfo(int id, int userId = 0)
        {
            try
            {
                var result = CorporateBusiness.GetJobInfo(id, userId);
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

        public JsonResult ApplyJob(JobAnswerModel model)
        {
            try
            {
                var result = CorporateBusiness.ApplyJob(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetAppliedJobs(int id)
        {
            try
            {
                var result = CorporateBusiness.GetAppliedJobs(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetAppliedProfiles(int jobId = 0, int internshipId = 0)
        {
            try
            {
                var studentProfiles = CorporateBusiness.GetAppliedStudents(jobId, internshipId);
                var employeeProfiles = CorporateBusiness.GetAppliedEmployees(jobId, internshipId);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { studentProfiles, employeeProfiles } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}