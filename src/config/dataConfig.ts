import path from "path";
import fs from "fs";
import commonReusables from "../util/commonReusables";
 
class DataConfig {
 
    readonly greenkartData: string = 'greenkartdata';

    private userDataPath: any;
    private userData: any;
    private csvPath: any;
    private csvData: any;
 
    public readJsonData(folderName:string, fileName: string): Record<string, string> {
        this.userDataPath = path.join(__dirname, '..', folderName, fileName);
        this.userData = JSON.parse(fs.readFileSync(this.userDataPath, 'utf-8'));
        const jsonData: Record<string, string> = {
            ...this.userData,
        };
        return jsonData;
    }

    public getTestDataFromCsv(dataFile: string, testCaseID: string): Record<string, string> {
        this.csvPath = this.getCSVDataFilePath(dataFile);
        this.csvData     = commonReusables.readTestDataFromCsv(this.csvPath, testCaseID);
        const testData: Record<string, string> = {
            ...this.csvData,
        };
        return testData;
    }
     
    private getCSVDataFilePath(dataFile: string){
        if (dataFile === this.greenkartData) {
            this.csvPath = path.join(__dirname, '..', 'data', 'greenkart.csv');
        }
        else {
            throw new Error(`Unknown data file: ${dataFile}`);
        }
        return this.csvPath;
    }
}
const dataConfig = new DataConfig();
export default dataConfig;