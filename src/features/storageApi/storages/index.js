import {AppwriteApi} from "@/features/storageApi/storages/AppwriteApi";
import {localStorageApi} from "@/features/storageApi/storages/localStorageApi";
export const storages = {
    'localStorage': new localStorageApi(),
    'AppwriteApi': new AppwriteApi(),
};
