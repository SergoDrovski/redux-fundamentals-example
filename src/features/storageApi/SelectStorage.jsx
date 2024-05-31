import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import Form from "@/features/storageApi/Form";
import {storages} from "@/features/storageApi/storages";
import {storage} from "@/features/storageApi/storage";
import {useNavigate} from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SelectStorage() {
    const navigate  = useNavigate();
    const [selected, setSelected] = useState(storages['localStorage'])
    const [pending, setPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPending(true);
        const formData = new FormData(e.target);
        const serializeData = {};
        for (let [key, value] of formData.entries()) {
            serializeData[key] = value;
        }
        serializeData.name = selected.name;

        storage.setStorage(selected);
        storage.saveConnectData(serializeData);
        storage.connect().then((connect)=>{
            navigate("/");
        }).catch(err=>{
            alert(err.message);
            setPending(false);
        })
    }

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">Select the storage type:</Label>
                    <div className="relative mt-2">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">{selected.name}</span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          </span>
                        </ListboxButton>

                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                            <ListboxOptions
                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {Object.values(storages).map((storageApi, index) => (
                                    <ListboxOption
                                        key={index}
                                        className={({focus}) =>
                                            classNames(
                                                focus ? 'bg-indigo-600 text-white' : '',
                                                !focus ? 'text-gray-900' : '',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={storageApi}
                                    >
                                        {({selected, focus}) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span className={
                                                        classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >{storageApi.name}</span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            focus ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    ></span>
                                                ) : null}
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </div>
                    <Form formOpt={selected.formOpt} handleSubmit={handleSubmit} pending={pending}/>
                </>
            )}
        </Listbox>
    )
}