export class IpConfig {

     public  fixedIp : string = 'http://13.209.197.173';

     public getIp() : any {
		return this.fixedIp;
	}
	
     public getIpAuthGitHub() : any {
		return this.fixedIp + ':3000/auth/github';
	}
     public getIpAuthGoogle() : any{
                return this.fixedIp + ':3000/auth/google';
       }

     public getApiIp() : any {
		 return this.fixedIp + ':3000/api/';
     }
}
