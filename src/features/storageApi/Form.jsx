export default function Form({formOpt, handleSubmit, pending}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 pt-12">
                    <p className="mt-1 text-sm leading-6 text-gray-600">Fill in the data to connect to the storage.</p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {formOpt.map((input, index) => {
                            return (<Input key={index} {...input}/>)
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="submit" disabled={pending}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                </button>
            </div>
        </form>
    )
}

function Input({label, name, type}) {

    return (
        <div className="sm:col-span-4">
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
            <div className="mt-2">
                <input id={name} name={name} type={type}
                       className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>
    )
}