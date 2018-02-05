var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserInfo = (function () {
    function UserInfo() {
        this.smallsow_url = "https://kdt.im/SMjyNr";
        this.isShare = false;
        this.isget = false;
    }
    Object.defineProperty(UserInfo, "instance", {
        get: function () {
            if (!UserInfo._instance) {
                UserInfo._instance = new UserInfo();
            }
            return UserInfo._instance;
        },
        enumerable: true,
        configurable: true
    });
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=UserInfo.js.map