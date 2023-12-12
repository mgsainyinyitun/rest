class TKBError {
    constructor(id,occureDate,group,server,serverity,fase,message) {
        this.id = id;
        this.occureDate = occureDate;
        this.group = group;
        this.server = server;
        this.serverity = serverity;
        this.fase = fase;
        this.message = message;
    }
    
    getErrorId() {
        return this.id;
    }

    display() {

        const tkb = {
            occureDate: this.occureDate,
            group: this.group,
            server: this.server,
            serverity: this.serverity,
            fase: this.fase,
            message: this.message
        }
        const valuesArray = Object.values(tkb);
        const vString = valuesArray.join(',');
       
        return [vString];
   
    }

    getTKBError() {
        return ({
            id: this.id,
            occureDate: this.occureDate,
            group: this.group,
            server: this.server,
            serverity: this.serverity,
            fase: this.fase,
            message: this.message
        })
    }
}

export default TKBError;