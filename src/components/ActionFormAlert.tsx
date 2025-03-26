const ActionFormAlert = ({ success, message, error, errors }: {
    success?: boolean | null | undefined;
    message?: string | null | undefined;
    error?: string | undefined;
    errors?: Record<string, string[] | undefined>
}) => {
    if (success === true) {
        return (
            <div className='flex justify-center items-center gap-2 
                bg-green-500 text-white max-w-max p-2 mx-auto mt-5'>
                <p>{message}</p>
            </div>
        )
    } else if (success === false) {
        return (
            <div className='flex flex-col justify-start items-start gap-2 
                bg-red-500 text-white max-w-max p-2 mx-auto mt-5'>
                <div className='flex items-center justify-center gap-2'>
                    <p>{error}</p>
                </div>
                { errors && (
                    <ul className='text-sm list-disc'>
                        {Object.keys(errors).map((errKey) => (
                            <li key={errKey}>- <strong>{errKey}</strong>{` -> ${errors[errKey]}`}</li>
                        ))}
                    </ul>
                ) }
            </div>
        )
    } else {
        return null
    }
}

export default ActionFormAlert