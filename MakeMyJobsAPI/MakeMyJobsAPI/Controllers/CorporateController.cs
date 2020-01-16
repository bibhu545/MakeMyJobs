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
        public JsonResult GetJobs(PostFilterModel model)
        {
            try
            {
                var result = CorporateBusiness.GetJobs(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetInternships(PostFilterModel model)
        {
            try
            {
                var result = CorporateBusiness.GetInternships(model);
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

        //public JsonResult GetCorporateInfoForEdit(int id)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.GetCorporateInfoForEdit(id);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public JsonResult UpdateCorporateBasicInfo(CorporateInfoModel model)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.UpdateCorporateBasicInfo(model);
        //        if (result != null)
        //        {
        //            if (Request.Files.Count > 0)
        //            {
        //                UploadLogo(result.corporateId);
        //            }
        //        }
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public bool UploadLogo(int corporateId)
        //{
        //    var folderPath = CommonFunctions.GetConfigValue("logoPath");
        //    List<string> documentExtensions = new List<string>() { ".jpg", ".png", ".jpeg", ".ico" };
        //    for (int i = 0; i < Request.Files.Count; i++)
        //    {
        //        var fileName = Path.GetFileName(Request.Files[i].FileName);
        //        var fileExtension = Path.GetExtension(Request.Files[i].FileName).ToLower();
        //        var fileNameOnDisk = string.Empty;
        //        if (documentExtensions.IndexOf(fileExtension) < 0)
        //        {
        //            return false;
        //        }
        //        fileNameOnDisk = fileNameOnDisk = "CTL-" + corporateId + "-" + Guid.NewGuid().ToString().Replace("-", "") + fileExtension;
        //        Request.Files[i].SaveAs(folderPath + fileNameOnDisk);
        //        if (CorporateBusiness.SaveLogo(corporateId, fileName, fileNameOnDisk, Request.Files[i].ContentLength) > 0)
        //        {
        //            return true;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //    return true;
        //}

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

        public JsonResult CreatePost(PostModel model)
        {
            try
            {
                var result = CorporateBusiness.CreatePost(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        //public JsonResult GetJobsByUser(int id)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.GetJobsByUser(id);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

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

        public JsonResult DeletePost(int id)
        {
            try
            {
                var result = CorporateBusiness.DeletePost(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetInternshipInfo(int id, int userId = 0)
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

        //public JsonResult ApplyJob(JobAnswerModel model)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.ApplyJob(model);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public JsonResult GetApplications(int id)
        //{
        //    try
        //    {
        //        var jobs = CorporateBusiness.GetAppliedJobs(id);
        //        var internships = CorporateBusiness.GetAppliedInternships(id);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { jobs, internships } };
        //        return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public JsonResult GetAppliedProfiles(int jobId = 0, int internshipId = 0)
        //{
        //    try
        //    {
        //        var studentProfiles = CorporateBusiness.GetAppliedStudents(jobId, internshipId);
        //        var employeeProfiles = CorporateBusiness.GetAppliedEmployees(jobId, internshipId);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { studentProfiles, employeeProfiles } };
        //        return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public FileResult ViewResume(int studentId = 0, int employeeId = 0)
        //{
        //    try
        //    {
        //        if(studentId != 0)
        //        {
        //            var fileName = string.Empty;
        //            byte[] fileBytes = CorporateBusiness.GetStudentResumeDetails(studentId, ref fileName);
        //            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        //        }
        //        else
        //        {
        //            var fileName = string.Empty;
        //            byte[] fileBytes = CorporateBusiness.GetEmployeeResumeDetails(employeeId, ref fileName);
        //            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}

        //public JsonResult SaveApplicantResponse(int forStudent, int forReject, int userId, int jobId)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.SaveApplicantResponse(forStudent, forReject, userId, jobId);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}

        //public JsonResult ApplyInternship(InternshipAnswerModel model)
        //{
        //    try
        //    {
        //        var result = CorporateBusiness.ApplyInternship(model);
        //        var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
        //        return new JsonResult { Data = response };
        //    }
        //    catch (Exception ex)
        //    {
        //        return CommonBusiness.GetErrorResponse(ex.Message);
        //    }
        //}
    }
}