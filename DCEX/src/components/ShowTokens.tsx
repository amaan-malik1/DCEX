import useGetUserTokens from "../hooks/useGetTokens";

const ShowTokens = () => {
    const { assets } = useGetUserTokens();

    return (
        <div className="mt-6 space-y-2 bg-slate-900/15  rounded-md my-2 p-2 ease-in-out  transition-all duration-200">
            {assets?.tokens.map((token) => (
                <div
                    key={token.mint}
                    className="flex justify-between border-b py-1 ease-in-out transition-all duration-200  hover:bg-slate-400/15"
                >
                    <span>{token.token}</span>
                    <span>{token.balance}</span>
                </div>
            ))}
        </div>
    )
}

export default ShowTokens