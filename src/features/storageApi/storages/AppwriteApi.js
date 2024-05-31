import {client} from "@/api/client";

export class AppwriteApi {
    constructor() {
        this.name = 'AppwriteApi';
        this.projectId = null;
        this.databaseId = null;
        this.collectionId = null;
        this.AppwriteKey = null;
        this.formOpt = [
            {label: 'projectId', name: 'projectId', type: 'text'},
            {label: 'databaseId', name: 'databaseId', type: 'text'},
            {label: 'collectionId', name: 'collectionId', type: 'text'},
            {label: 'AppwriteKey', name: 'AppwriteKey', type: 'text'},
        ];
       this.endpoint = 'https://cloud.appwrite.io/v1/databases'

    }

    setConnectData({projectId, databaseId, collectionId, AppwriteKey}) {
        this.projectId = projectId;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
        this.AppwriteKey = AppwriteKey;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Appwrite-Response-Format': '1.5.0',
            'X-Appwrite-Project': this.projectId,
            'X-Appwrite-Key': this.AppwriteKey,
        }
    }


    async connect(data) {
        this.setConnectData(data);
        return await client.get(
            this.endpoint,
            {headers: this.headers}
        )
    }

    async find() {
        debugger
        const res = await client.get(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents`,
            {headers: this.headers}
        )

        // const normalizeData = res.documents.map((note)=>{
        //
        // });
        return res.documents
    }

    async updateOne({id, title, status, todos}) {
        const body = {
            title: "new title",
            status,
            todos: [
                {
                    $id: "66506b15001a15cd4806",
                    text: "test",
                    completed: false
                },
                {
                    $id: "66506b230000f415b097",
                    text: "test",
                    completed: false
                }
            ]
        }
        const res = await client.patch(
            this.endpoint + `/${this.databaseId}/collections/${this.collectionId}/documents/66506b5d00348ff48c8a`,
            JSON.stringify(body),
            {headers: this.headers},
        )

        return res.documents
    }
}