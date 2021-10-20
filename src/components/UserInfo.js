export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo () {
      const userInfo = {
        name: this._nameSelector.textContent,
        job: this._jobSelector.textContent
      }
      return userInfo
  }

  setUserInfo(newName, newJob, avatar){
    this._nameSelector.textContent = newName;
    this._jobSelector.textContent = newJob;
    this._avatarSelector.src = avatar;
  }

  setAvatarImage(avatarUrl){
    this._avatarSelector.src = avatarUrl;
  }
}
