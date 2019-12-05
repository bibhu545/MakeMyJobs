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

export class JobModel {
    constructor() {
        this.jobId = 0;
        this.title = '';
        this.description = '';
        this.company = '';
        this.image = 0;
        this.experience = '';
        this.location = '';
        this.postsAvailable = 0;
        this.tags = '';
        this.salary = '';
        this.postedBy = '';
        this.additionalInfo = '';
        this.expiryDate = '';
        this.postedOn = '';
    }
}

export class InternshipModel {
    constructor() {
        this.internshipId = 0;
        this.title = '';
        this.description = '';
        this.company = '';
        this.image = 0;
        this.skillsRequired = '';
        this.internshipType = 0;
        this.postsAvailable = 0;
        this.location = '';
        this.duration = 0;
        this.tags = '';
        this.stipend = '';
        this.postedBy = '';
        this.additionalInfo = '';
        this.startDate = '';
        this.expiryDate = '';
        this.postedOn = '';
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
    }
}
