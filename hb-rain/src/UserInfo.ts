class UserInfo 
{
	public constructor() 
	{

	}

	private static _instance;

	public static get instance():UserInfo
	{
		if(!UserInfo._instance)
		{
			UserInfo._instance = new UserInfo();
		}
		return UserInfo._instance;
	}


	public username;
	public url;
	public shopList;

	/**
	 * 是否固定码
	 * 0:不固定
	 * 1:固定
	 */
	public fixed;

	public smallsow_url = "https://kdt.im/SMjyNr";

	public isShare = false;

	public isget = false;
}