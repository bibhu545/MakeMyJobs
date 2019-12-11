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

                    corporateInfoModel.corporateJobs = new List<JobModel>();
                    corporateInfoModel.corporateInternships = new List<InternshipModel>();

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
    }
}