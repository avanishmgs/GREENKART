import dataConfig from "../config/dataConfig";

class LoginSetup {
    Execution_Env: string;
    Url: string;
    private data = dataConfig.readJsonData("helpers", "config.json");
    constructor() {
        const envData = this.data && this.data.env ? (this.data.env as any) : {};
        const urlsData = this.data && this.data.urls ? (this.data.urls as any) : {};
        this.Execution_Env = envData.Execution_Env || '';
        this.Url = urlsData.greenKartUrl.replace('${env}', this.Execution_Env);
    }
}
const loginSetup = new LoginSetup();
export default loginSetup;