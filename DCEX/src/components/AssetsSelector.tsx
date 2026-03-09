import type { Token } from '../context/AssetsContext';
import { useAssets } from '../hooks/useAssets'


const AssetsSelector = ({ onSelect, selectedToken, title }: {
    onSelect: (assets: Token) => void;
    selectedToken: Token;
    title: string;
}) => {

    const { assets, isLoading } = useAssets();
    if (isLoading) {
        return "Loading tokens..."
    }
    return (
        <div className="flex flex-col gap-1 justify-center items-center">
            {/* you pay */}
            <span className='font-semibold text-sm'>{title}</span>
            <select
                onChange={(e) => {
                    const selectedToken = assets?.tokens.find(x => x.token === e.target.value)
                    if (selectedToken) {
                        onSelect(selectedToken);
                    }
                }}
                // name="token"
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