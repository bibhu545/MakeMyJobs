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
    public class EmployeeController : Controller
    {
        public ActionResult GetEmployeeInfo(int id)
        {
            try
            {
                var result = EmployeeBusiness.GetEmployeeInfo(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult GetEmployeeInfoForEdit(int id)
        {
            try
            {
                var result = EmployeeBusiness.GetEmployeeInfoForEdit(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult UpdateEmployeeBasicInfo(EmployeeInfoModel model)
        {
            try
            {
                var result = EmployeeBusiness.UpdateEmployeeBasicInfo(model);
                if(result != null)
                {
                    if(Request.Files.Count > 0)
                    {
                        UploadEmployeeResume(result.employeeId);
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

        public bool UploadEmployeeResume(int employeeId)
        {
            var folderPath = CommonFunctions.GetConfigValue("employeeResumePath");
            List<string> documentExtensions = new List<string>() { ".pdf", ".doc", ".docx" };
            for (int i = 0; i < Request.Files.Count; i++)
            {
                var fileName = Path.GetFileName(Request.Files[i].FileName);
                var fileExtension = Path.GetExtension(Request.Files[i].FileName).ToLower();
                var fileNameOnDisk = string.Empty;
                if (documentExtensions.IndexOf(fileExtension) < 0)
                {
                    return false;
                }
                fileNameOnDisk = fileNameOnDisk = "ER-" + employeeId + "-" + Guid.NewGuid().ToString().Replace("-", "") + fileExtension;
                Request.Files[i].SaveAs(folderPath + fileNameOnDisk);
                if (EmployeeBusiness.UploadResume(employeeId, fileName, fileNameOnDisk, Request.Files[i].ContentLength) > 0)
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

        public JsonResult AddEmployeeEducation(EmployeeEducationModel model)
        {
            try
            {
                var result = EmployeeBusiness.AddEmployeeEducation(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult EditEmployeeEducation(EmployeeEducationModel model)
        {
            try
            {
                var result = EmployeeBusiness.EditEmployeeEducation(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult AddEmployeeExperience(EmployeeExperienceModel model)
        {
            try
            {
                var result = EmployeeBusiness.AddEmployeeExperience(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult EditEmployeeExperience(EmployeeExperienceModel model)
        {
            try
            {
                var result = EmployeeBusiness.EditEmployeeExperience(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult DeleteEmployeeExperience(int id)
        {
            try
            {
                var result = EmployeeBusiness.DeleteEmployeeExperience(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }

        public JsonResult DeleteEmployeeEducation(int id)
        {
            try
            {
                var result = EmployeeBusiness.DeleteEmployeeEducation(id);
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