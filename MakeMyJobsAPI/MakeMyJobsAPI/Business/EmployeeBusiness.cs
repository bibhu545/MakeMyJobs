using MakeMyJobsAPI.EDMX;
using MakeMyJobsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MakeMyJobsAPI.Business
{
    public class EmployeeBusiness
    {
        public static EmployeeInfoModel GetEmployeeInfo(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Employees.Any(x => x.UserId == id))
                {
                    EmployeeInfoModel employeeInfoModel = context.Employees.Join(context.States, e => e.State, st => st.StateId, (e, st) => new
                    {
                        StateName = st.StateName,
                        employee = e
                    }).Join(context.Countries, e => e.employee.Country, c => c.CountryId, (e, c) => new
                    {
                        employee = e,
                        stateName = e.StateName,
                        countryName = c.CountryName
                    }).Join(context.Users, e => e.employee.employee.UserId, u => u.UserId, (e, u) => new EmployeeInfoModel()
                    {
                        employeeId = e.employee.employee.EmployeeId,
                        userId = e.employee.employee.UserId,
                        firstName = e.employee.employee.FirstName,
                        lastName = e.employee.employee.LastName,
                        city = e.employee.employee.City,
                        contactNumber = e.employee.employee.ContactNumber,
                        dateOfBirth = e.employee.employee.DateOfBirth,
                        resume = e.employee.employee.Resume,
                        dateJoined = e.employee.employee.DateJoined,
                        address = e.employee.employee.Address + (e.employee.employee.City == null ? "" : (", " + e.employee.employee.City)) + (e.employee.employee.State == 0 ? "" : (", " + e.employee.StateName)) + (e.employee.employee.Country == 0 ? "" : (", " + e.countryName)),
                        state = e.employee.employee.State,
                        country = e.employee.employee.Country,
                        email = u.Email,
                        zipCode = e.employee.employee.ZipCode
                    }).FirstOrDefault(x => x.userId == id);

                    employeeInfoModel.employeeEducation = new List<EmployeeEducationModel>();
                    employeeInfoModel.employeeEducation = context.EmployeeEducations.Where(x => x.EmployeeId == employeeInfoModel.employeeId && x.IsActive == 1).Select(x => new EmployeeEducationModel()
                    {
                        empEducationId = x.EmpEducationId,
                        employeeId = x.EmployeeId,
                        instituteName = x.InstituteName,
                        instituteType = x.InstituteType,
                        percentage = x.Percentage,
                        joinedOn = x.JoinedOn,
                        passedOn = x.PassedOn,
                        isActive = x.IsActive
                    }).ToList();

                    employeeInfoModel.employeeExperience = new List<EmployeeExperienceModel>();
                    employeeInfoModel.employeeExperience = context.EmployeeExperiences.Where(x => x.EmployeeId == employeeInfoModel.employeeId && x.IsActive == 1).Select(x => new EmployeeExperienceModel()
                    {
                        empExperienceId = x.EmpExperienceId,
                        employeeId = x.EmployeeId,
                        companyName = x.CompanyName,
                        position = x.Position,
                        joinedOn = x.JoinedOn,
                        leftOn = x.LeftOn,
                        isActive = x.IsActive,
                    }).ToList();

                    return employeeInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }

        public static EmployeeInfoModel GetEmployeeInfoForEdit(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                if (context.Employees.Any(x => x.UserId == id))
                {
                    EmployeeInfoModel employeeInfoModel = context.Employees.Join(context.Users, e => e.UserId, u => u.UserId, (e, u) => new EmployeeInfoModel()
                    {
                        employeeId = e.EmployeeId,
                        userId = e.UserId,
                        firstName = e.FirstName,
                        lastName = e.LastName,
                        city = e.City,
                        contactNumber = e.ContactNumber,
                        dateOfBirth = e.DateOfBirth,
                        resume = e.Resume,
                        dateJoined = e.DateJoined,
                        address = e.Address,
                        state = e.State,
                        country = e.Country,
                        email = u.Email,
                        zipCode = e.ZipCode
                    }).FirstOrDefault(x => x.userId == id);
                    return employeeInfoModel;
                }
                else
                {
                    return null;
                }
            }
        }

        public static EmployeeInfoModel UpdateEmployeeBasicInfo(EmployeeInfoModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                int updated = 0;
                var user = context.Users.FirstOrDefault(x => x.UserId == model.userId && x.IsActive == 1);
                var employee = context.Employees.FirstOrDefault(x => x.EmployeeId == model.employeeId);
                if (user == null || employee == null)
                {
                    return null;
                }
                else
                {
                    user.Email = model.email;
                    updated += context.SaveChanges();
                    employee.FirstName = model.firstName;
                    employee.LastName = model.lastName;
                    employee.ContactNumber = model.contactNumber;
                    employee.DateOfBirth = model.dateOfBirth;
                    employee.City = model.city;
                    employee.Address = model.address;
                    employee.State = model.state;
                    employee.Country = model.country;
                    employee.ZipCode = model.zipCode;
                    updated += context.SaveChanges();
                }
                if (updated > 0)
                {
                    return GetUpdatedEmployeeInfo(user.UserId, employee.EmployeeId);
                }
                else
                {
                    return null;
                }
            }
        }

        private static EmployeeInfoModel GetUpdatedEmployeeInfo(int userId, int employeeId)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var user = context.Users.FirstOrDefault(x => x.UserId == userId && x.IsActive == 1);
                var employee = context.Employees.FirstOrDefault(x => x.EmployeeId == employeeId);
                if (user == null || employee == null)
                {
                    return null;
                }
                else
                {
                    return new EmployeeInfoModel()
                    {
                        userId = userId,
                        employeeId = employeeId,
                        email = user.Email,
                        firstName = employee.FirstName,
                        lastName = employee.LastName,
                        contactNumber = employee.ContactNumber,
                        city = employee.City,
                        address = employee.Address,
                        state = employee.State,
                        country = employee.Country,
                        dateOfBirth = employee.DateOfBirth,
                        zipCode = employee.ZipCode
                    };
                }
            }
        }

        public static EmployeeEducationModel AddEmployeeEducation(EmployeeEducationModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                EmployeeEducation employeeEducation = new EmployeeEducation();
                employeeEducation.EmployeeId = model.employeeId;
                employeeEducation.InstituteName = model.instituteName;
                employeeEducation.InstituteType = model.instituteType;
                employeeEducation.JoinedOn = model.joinedOn;
                employeeEducation.PassedOn = model.passedOn;
                employeeEducation.Percentage = Convert.ToDecimal(model.percentage);
                employeeEducation.IsActive = 1;
                context.EmployeeEducations.Add(employeeEducation);
                int added = context.SaveChanges();
                if (added > 0)
                {
                    return new EmployeeEducationModel()
                    {
                        empEducationId = employeeEducation.EmpEducationId,
                        employeeId = employeeEducation.EmployeeId,
                        instituteName = employeeEducation.InstituteName,
                        instituteType = employeeEducation.InstituteType,
                        joinedOn = employeeEducation.JoinedOn,
                        passedOn = employeeEducation.PassedOn,
                        percentage = employeeEducation.Percentage,
                        isActive = employeeEducation.IsActive
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public static EmployeeEducationModel EditEmployeeEducation(EmployeeEducationModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                EmployeeEducation employeeEducation = context.EmployeeEducations.FirstOrDefault(x => x.EmpEducationId == model.empEducationId);
                if (employeeEducation != null)
                {
                    employeeEducation.EmployeeId = model.employeeId;
                    employeeEducation.InstituteName = model.instituteName;
                    employeeEducation.InstituteType = model.instituteType;
                    employeeEducation.JoinedOn = model.joinedOn;
                    employeeEducation.PassedOn = model.passedOn;
                    employeeEducation.IsActive = 1;
                    int updated = context.SaveChanges();
                    if (updated > 0)
                    {
                        return new EmployeeEducationModel()
                        {
                            empEducationId = employeeEducation.EmpEducationId,
                            employeeId = employeeEducation.EmployeeId,
                            instituteName = employeeEducation.InstituteName,
                            instituteType = employeeEducation.InstituteType,
                            joinedOn = employeeEducation.JoinedOn,
                            passedOn = employeeEducation.PassedOn,
                            isActive = employeeEducation.IsActive
                        };
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
        }

        public static EmployeeExperienceModel AddEmployeeExperience(EmployeeExperienceModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                EmployeeExperience employeeExperience = new EmployeeExperience();
                employeeExperience.EmployeeId = model.employeeId;
                employeeExperience.CompanyName = model.companyName;
                employeeExperience.Position = model.position;
                employeeExperience.JoinedOn = model.joinedOn;
                employeeExperience.LeftOn = model.leftOn;
                employeeExperience.IsActive = 1;
                context.EmployeeExperiences.Add(employeeExperience);
                int added = context.SaveChanges();
                if (added > 0)
                {
                    return new EmployeeExperienceModel()
                    {
                        empExperienceId = employeeExperience.EmpExperienceId,
                        employeeId = employeeExperience.EmployeeId,
                        companyName = employeeExperience.CompanyName,
                        position = employeeExperience.Position,
                        joinedOn = employeeExperience.JoinedOn,
                        leftOn = employeeExperience.LeftOn,
                        isActive = employeeExperience.IsActive
                    };
                }
                else
                {
                    return null;
                }
            }
        }

        public static EmployeeExperienceModel EditEmployeeExperience(EmployeeExperienceModel model)
        {
            using (var context = new MakeMyJobsEntities())
            {
                EmployeeExperience employeeExperience = context.EmployeeExperiences.FirstOrDefault(x => x.EmpExperienceId == model.empExperienceId);
                if(employeeExperience != null)
                {
                    employeeExperience.EmployeeId = model.employeeId;
                    employeeExperience.CompanyName = model.companyName;
                    employeeExperience.Position = model.position;
                    employeeExperience.JoinedOn = model.joinedOn;
                    employeeExperience.LeftOn = model.leftOn;
                    employeeExperience.IsActive = 1;
                    int updated = context.SaveChanges();
                    if (updated > 0)
                    {
                        return new EmployeeExperienceModel()
                        {
                            empExperienceId = employeeExperience.EmpExperienceId,
                            employeeId = employeeExperience.EmployeeId,
                            companyName = employeeExperience.CompanyName,
                            position = employeeExperience.Position,
                            joinedOn = employeeExperience.JoinedOn,
                            leftOn = employeeExperience.LeftOn,
                            isActive = employeeExperience.IsActive
                        };
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
        }

        public static bool DeleteEmployeeExperience(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var employeeExperience = context.EmployeeExperiences.FirstOrDefault(x => x.EmpExperienceId == id);
                if(employeeExperience != null)
                {
                    employeeExperience.IsActive = 2;
                    int deleted = context.SaveChanges();
                    return deleted > 0 ;
                }
                else
                {
                    return false;
                }
            }
        }

        public static bool DeleteEmployeeEducation(int id)
        {
            using (var context = new MakeMyJobsEntities())
            {
                var employeeEducation = context.EmployeeEducations.FirstOrDefault(x => x.EmpEducationId == id);
                if (employeeEducation != null)
                {
                    employeeEducation.IsActive = 2;
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