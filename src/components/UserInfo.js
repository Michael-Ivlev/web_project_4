export class UserInfo {
  constructor(name, job) {
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(job);
  }

  getUserInfo () {
      const userInfo = {
        name: this._userName.textContent,
        job: this._userJob.textContent
      }
      return userInfo
  }

  setUserInfo(newName, newJob){
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }
}
