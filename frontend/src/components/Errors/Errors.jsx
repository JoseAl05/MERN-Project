const Errors = ({error, isSubmitted}) => {
    return (
        <>
            <div className="alert alert-danger">
                <ul>
                    {isSubmitted && error.map(error => {
                        return <li>{error.msg}</li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default Errors;