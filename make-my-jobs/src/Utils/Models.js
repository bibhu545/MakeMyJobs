export class SignpModel {
    constructor() {
        this.email = '';
        this.password = '';
        this.userType = 0;
    }
}

export class JobModel{
    constructor(){
        this.jobId = 0;
        this.title = '';
        this.description = '';
        this.company =  '';
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

export class InternshipModel{
    constructor(){
        this.internshipId = 0;
        this.title = '';
        this.description = '';
        this.company =  '';
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
