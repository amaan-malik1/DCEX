import useGetUserTokens from '../hooks/useGetTokens'

const AssetsSelector = ({ onSelect, selectedToken, title }: {
    onSelect: React.ReactNode;
    selectedToken: string;
    title: string;
}) => {

    const { assets, isLoading } = useGetUserTokens();
    if (isLoading) {
        return "Loading tokens..."
    }
    return (
        <div className="flex flex-col gap-1 justify-center items-center">
            <span>{title}</span>
            <select
                onChange={(e) => {
                    const selectedToken = assets?.tokens.find(x => x.token === e.target.value)
                    if (selectedToken) {
                        onSelect(selectedToken);
                    }
                }}
                name="token"
                id="token"
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
                {assets?.tokens.map((token) => (
                    <option
                        key={token.token}
                        selected={selectedToken.token == token.token}
                    >
                        {token.token}
                    </option>
                ))}
            </select>
        </div >
    )
}

export default AssetsSelector