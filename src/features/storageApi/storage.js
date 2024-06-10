import {storages} from "@/features/storageApi/storages";

export class Storage {
    constructor() {
        this.storageApi = null;
        this.connectData = null;
        this.connectStatus = false;
        let connectData = localStorage.getItem('connect');
        if(connectData){
            connectData = JSON.parse(connectData);
            this.storageApi = storages[connectData.name];
            this.connectData = connectData;
        }
    }
    saveConnectData(connectData) {
        this.connectData = {...connectData};
        localStorage.setItem('connect', JSON.stringify(this.connectData));
    }

    setStorage(api){
        this.storageApi = api;
        window["storageAp"] = api;
    }

    async connect() {
        // debugger
        if(!this.storageApi) return null;
        try {
            const connect = await this.storageApi.connect(this.connectData);
            if(connect) {
                this.connectStatus = true;
                return connect;
            }
        } catch (e) {
            return Promise.reject(e.message)
        }
    }

    async find() {
        return this.storageApi.find();
    }

    async updateOne(id, note) {
        return this.storageApi.updateOne(id, note);
    }

    async insertOne(note) {
        return this.storageApi.insertOne(note);
    }

    async deleteOne(note) {
        return this.storageApi.deleteOne(note);
    }
}

export const storage = new Storage();

