// {
//     type: "local" | "remote"
//     log: string
//     pass: string
// }
export class ConnectScheme {
    constructor() {
        const authData = localStorage.getItem('connect');
        this.authData = authData ? JSON.parse(authData) : null;
    }
    save(payload) {
        const {type, log, pass} = payload;
        this.authData = {
            type: (type === "local" || type === "remote") ? type : "local",
            log: log ? String(log) : "",
            pass: pass ? String(pass) : "",
        }
        localStorage.setItem('connect', JSON.stringify(this.authData));
    }
    clear(){
        localStorage.clear();
    }
}

// export const createConnect = ()  => new ConnectScheme();


