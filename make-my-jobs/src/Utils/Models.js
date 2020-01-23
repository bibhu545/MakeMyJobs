export class SignpModel {
    constructor() {
        this.email = '';
        this.password = '';
        this.userType = 0;
        this.firstName = '';
        this.lastName = '';
    }
}

export class LoginModel {
    constructor() {
        this.email = '';
        this.password = '';
    }
}

export class LoginResponseModel {
    constructor() {
        this.loggedIn = 0;
        this.userId = 0;
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.userType = 0;
    }
}

export class ChangePasswordModel {
    constructor() {
        this.userId = 0;
        this.currentPassword = "";
        this.updatedPassword = "";
    }
}

export class UserCookieInfoModel {
    constructor() {
        this.userId = 0;
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.userType = 0;
    }
}

export class DropDownModel {
    constructor() {
        this.value = 0;
        this.text = "";
    }
}

export class UserModel {
    constructor() {
        this.userId = 0;
        this.studentId = 0;
        this.email = '';
        this.address = '';
        this.contactNumber = '';
        this.state = '';
        this.country = '';
        this.firstName = '';
        this.lastName = '';
        this.resume = '';
        this.collegeName = '';
        this.dateJoined = '';
        this.dateOfBirth = '';
        this.zipCode = '';
    }
}

export class ProffessionalModel {
    constructor() {
        this.userId = 0;
        this.employeeId = 0;
        this.email = '';
        this.city = '';
        this.address = '';
        this.zipCode = '';
        this.contactNumber = '';
        this.state = '';
        this.country = '';
        this.firstName = '';
        this.lastName = '';
        this.resume = '';
        this.dateJoined = '';
        this.dateOfBirth = '';
        this.employeeEducation = [];
        this.employeeExperience = [];
    }
}

export class CorporateModel {
    constructor() {
        this.userId = 0;
        this.corporateId = 0;
        this.email = '';
        this.city = '';
        this.address = '';
        this.zipCode = '';
        this.contactNumber = '';
        this.state = '';
        this.country = '';
        this.firstName = '';
        this.lastName = '';
        this.companyName = '';
        this.companyInfo = '';
        this.logo = '';
        this.dateJoined = '';
        this.dateOfBirth = '';
        this.corporateJobs = [];
        this.corporateInternships = [];
    }
}

export class EmployeeEducationModel {
    constructor() {
        this.empEducationId = 0;
        this.employeeId = 0;
        this.instituteName = "";
        this.instituteType = 0;
        this.percentage = 0.0;
        this.joinedOn = '';
        this.passedOn = '';
        this.isActive = 0;
    }
}

export class EmployeeExperienceModel {
    constructor() {
        this.empExperienceId = 0;
        this.employeeId = 0;
        this.companyName = "";
        this.position = 0;
        this.joinedOn = '';
        this.leftOn = '';
        this.isActive = 0;
    }
}

export class CheckBoxModel {
    constructor() {
        this.value = 0;
        this.text = "";
        this.cheked = false;
    }
}
export class PostFilterModel {
    constructor() {
        this.userId = 0;
        this.postType = 0;
        this.searchKeyword = null;
        this.tag = 0;
        this.city = 0;
        this.skill = 0;
        this.salaryOptions = [];
        this.isWFHAvailable = false;
        this.isPartTimeAvailable = false;
        this.jobOffer = false;
        this.minStipend = 0;
        this.startDate = null;
        this.page = 0;
    }
}

export class PostModel {
    constructor() {
        this.postId = 0;
        this.userId = 0;
        this.title = '';
        this.description = '';
        this.companyName = '';
        this.companyInfo = '';
        this.locations = [];
        this.tags = [];
        this.skills = [];
        this.startDate = '';
        this.expiryDate = '';
        this.postedOn = '';
        this.lastUpdatedOn = '';
        this.locationNames = '';
        this.tagNames = '';
        this.skillNames = '';
        this.minSalary = 0;
        this.maxSalary = 0;
        this.postsAvailable = 0;
        this.isWFHAvailable = false;
        this.isPartTimeAvailable = false;
        this.jobOffer = false;
        this.isActicve = 0;
        this.questionOne = '';
        this.questionTwo = '';
        this.questionThree = '';
        this.postType = 0;
        this.applied = false;
        this.totalApplications = 0;
    }
}

export class JobModel {
    constructor() {
        this.jobId = 0;
        this.userId = 0;
        this.jobTitle = '';
        this.description = '';
        this.companyName = '';
        this.companyInfo = '';
        this.locations = [];
        this.tags = [];
        this.skills = [];
        this.experience = 0;
        this.expiryDate = '';
        this.minSalary = 0;
        this.maxSalary = 0;
        this.postsAvailable = 0;
        this.questionOne = '';
        this.questionTwo = '';
        this.questionThree = '';
        this.locationNames = '';
        this.tagNames = '';
        this.skillNames = '';
        this.postedOn = '';
        this.lastUpdatedOn = '';
        this.applied = false;
        this.totalApplications = 0;
    }
}

export class InternshipModel {
    constructor() {
        this.internshipId = 0;
        this.userId = 0;
        this.title = '';
        this.description = '';
        this.companyName = '';
        this.companyInfo = '';
        this.locations = [];
        this.tags = [];
        this.skills = [];
        this.startDate = '';
        this.expiryDate = '';
        this.postedOn = '';
        this.lastUpdatedOn = '';
        this.locationNames = '';
        this.tagNames = '';
        this.skillNames = '';
        this.minStipend = 0;
        this.maxStipend = 0;
        this.postsAvailable = 0;
        this.isWFHAvailable = false;
        this.isPartTimeAvailable = false;
        this.jobOffer = false;
        this.isActicve = 0;
        this.questionOne = '';
        this.questionTwo = '';
        this.questionThree = '';
        this.postType = 0;
    }
}

export class AnswerModel {
    constructor() {
        this.userId = 0;
        this.postId = 0;
        this.answerOne = '';
        this.answerTwo = '';
        this.answerThree = '';
    }
}

export class AppliedJobModel {
    constructor() {
        this.jobDetails = new JobModel();
        this.answerOne = '';
        this.answerTwo = '';
        this.answerThree = '';
        this.applyDate = '';
    }
}